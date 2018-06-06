namespace DataAggregation.CountyService
{
    using DataAggregation.Common;
    using DataAggregation.Common.ServiceUtilities;
    using DataAggregation.Common.Types;
    using DataAggregation.CountyService.Models;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.ServiceFabric.Data;
    using Microsoft.ServiceFabric.Data.Collections;
    using Microsoft.ServiceFabric.Services.Client;
    using Microsoft.ServiceFabric.Services.Communication.AspNetCore;
    using Microsoft.ServiceFabric.Services.Communication.Runtime;
    using Microsoft.ServiceFabric.Services.Runtime;
    using ProtoBuf;
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Fabric;
    using System.Fabric.Description;
    using System.IO;
    using System.Linq;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;

    /// <summary>
    /// The FabricRuntime creates an instance of this class for each service type instance. 
    /// </summary>
    internal sealed class CountyService : StatefulService
    {
        internal const string ServiceTypeName = "DataAggregation.CountyServiceType";
        internal const string ConfigSectionName = "DataAggregation.CountyService.Settings";
        internal const string CountyNameDictionaryName = "CountyNames";
        internal const string CountyHealthDictionaryName = "{0}-Health";
        object ConfigPackageLockObject = new object();
        private KeyedCollection<string, ConfigurationProperty> configPackageSettings;
        private readonly HealthIndexCalculator indexCalculator;

        public CountyService(StatefulServiceContext serviceContext) : base(serviceContext)
        {
            InitConfig();
            StateManager.TryAddStateSerializer<CountyDoctorStats>(new CountyDoctorStatsSerializer());
            this.indexCalculator = new HealthIndexCalculator(serviceContext);
        }

        public CountyService(StatefulServiceContext serviceContext, IReliableStateManagerReplica reliableStateManagerReplica)
            : base(serviceContext, reliableStateManagerReplica)
        {
            InitConfig();
            this.StateManager.TryAddStateSerializer<CountyDoctorStats>(new CountyDoctorStatsSerializer());
            this.indexCalculator = new HealthIndexCalculator(serviceContext);
        }

        /// <summary>
        /// Optional override to create listeners (like tcp, http) for this service instance.
        /// </summary>
        /// <returns>The collection of listeners.</returns>
        protected override IEnumerable<ServiceReplicaListener> CreateServiceReplicaListeners()
        {
            return new ServiceReplicaListener[]
            {
                new ServiceReplicaListener(serviceContext =>
                {
                    return new KestrelCommunicationListener(serviceContext, (url, listener) =>
                    {
                        ServiceEventSource.Current.ServiceMessage(serviceContext, $"Starting Kestrel on {url}");

                        return new WebHostBuilder()
                                    .UseKestrel()
                                    .ConfigureServices(
                                        services => services
                                            .AddSingleton<StatefulServiceContext>(serviceContext)
                                            .AddSingleton<IReliableStateManager>(this.StateManager)
                                            .AddSingleton<HealthIndexCalculator>(this.indexCalculator))
                                    .UseContentRoot(Directory.GetCurrentDirectory())
                                    .UseStartup<Startup>()
                                    .UseServiceFabricIntegration(listener, ServiceFabricIntegrationOptions.UseUniqueServiceUrl)
                                    .UseUrls(url)
                                    .Build();
                    }
                    );
        }, "CountyEndpoint")};
        }


        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            ServiceEventSource.Current.ServiceMessage(this.Context, "CountyService starting data processing.");

            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    //every interval seconds, grab the counties and send them to national
                    await Task.Delay(TimeSpan.FromSeconds(int.Parse(this.GetSetting("UpdateFrequency"))), cancellationToken);

                    IReliableDictionary<int, string> countyNamesDictionary =
                        await this.StateManager.GetOrAddAsync<IReliableDictionary<int, string>>(CountyNameDictionaryName);

                    IList<KeyValuePair<int, string>> countyNames = new List<KeyValuePair<int, string>>();

                    using (ITransaction tx = this.StateManager.CreateTransaction())
                    {
                        var enumerator = (await countyNamesDictionary.CreateEnumerableAsync(tx)).GetAsyncEnumerator();

                        while (await enumerator.MoveNextAsync(cancellationToken))
                        {
                            countyNames.Add(enumerator.Current);
                        }

                        await tx.CommitAsync();
                    }

                    foreach (KeyValuePair<int, string> county in countyNames)
                    {
                        IReliableDictionary<Guid, CountyDoctorStats> countyHealth =
                            await
                                this.StateManager.GetOrAddAsync<IReliableDictionary<Guid, CountyDoctorStats>>(
                                    string.Format(CountyHealthDictionaryName, county.Key));

                        int totalDoctorCount = 0;
                        int totalPatientCount = 0;
                        long totalHealthReportCount = 0;
                        //double priorAvg = 0;
                        //double expandedAverage = 0;
                        //double newTotal = 0;

                        IList<KeyValuePair<Guid, CountyDoctorStats>> records = new List<KeyValuePair<Guid, CountyDoctorStats>>();

                        using (ITransaction tx = this.StateManager.CreateTransaction())
                        {
                            var enumerator = (await countyHealth.CreateEnumerableAsync(tx, EnumerationMode.Unordered)).GetAsyncEnumerator();

                            while (await enumerator.MoveNextAsync(cancellationToken))
                            {
                                records.Add(enumerator.Current);
                            }

                            await tx.CommitAsync();
                        }

                        foreach (KeyValuePair<Guid, CountyDoctorStats> item in records)
                        {
                            //expandedAverage = priorAvg * totalDoctorCount;
                            //newTotal = expandedAverage + item.Value.AverageHealthIndex.GetValue();

                            totalDoctorCount++;
                            totalPatientCount += item.Value.PatientCount;
                            totalHealthReportCount += item.Value.HealthReportCount;

                            //priorAvg = newTotal / totalHealthReportCount;
                        }

                        HealthIndex avgHealth;

                        if (records.Count > 0)
                        {
                            avgHealth = this.indexCalculator.ComputeAverageIndex(records.Select(x => x.Value.AverageHealthIndex));
                        }
                        else
                        {
                            avgHealth = this.indexCalculator.ComputeIndex(-1);
                        }


                        CountyStatsViewModel payload = new CountyStatsViewModel(totalDoctorCount, totalPatientCount, totalHealthReportCount, avgHealth);

                        ServiceUriBuilder serviceUri = new ServiceUriBuilder(this.GetSetting("NationalServiceInstanceName"));

                        await FabricHttpClient.MakePostRequest<CountyStatsViewModel>(
                            serviceUri.ToUri(),
                            new ServicePartitionKey(),
                            "NationalEndpoint",
                            "/national/health/" + county.Key,
                            payload,
                            SerializationSelector.PBUF,
                            cancellationToken
                            );

                    }
                }
                catch (TimeoutException te)
                {
                    // transient error. Retry.
                    ServiceEventSource.Current.ServiceMessage(
                        this.Context,
                        "CountyService encountered an exception trying to send data to National Service: TimeoutException in RunAsync: {0}",
                        te.ToString());
                }
                catch (FabricNotReadableException fnre)
                {
                    ServiceEventSource.Current.ServiceMessage(
                        this.Context,
                        "CountyService encountered an exception trying to send data to National Service: TimeoutException in RunAsync: {0}",
                        fnre.ToString());// transient error. Retry.
                }
                catch (FabricTransientException fte)
                {
                    // transient error. Retry.
                    ServiceEventSource.Current.ServiceMessage(
                        this.Context,
                        "CountyService encountered an exception trying to send data to National Service: FabricTransientException in RunAsync: {0}",
                        fte.ToString());
                }
                catch (FabricNotPrimaryException)
                {
                    // not primary any more, time to quit.
                    return;
                }
                catch (HttpRequestException hre)
                {
                    ServiceEventSource.Current.ServiceMessage(
                        this.Context,
                        "CountyService encountered an exception trying to send data to National Service: HttpRequestException in RunAsync: {0}",
                        hre.ToString());
                }
                catch (ProtoException pbe)
                {
                    ServiceEventSource.Current.ServiceMessage(
                        this.Context,
                        "CountyService encountered an exception trying to send data to National Service: ProtoException in RunAsync: {0}",
                        pbe.ToString());
                }
                catch (Exception ex)
                {
                    ServiceEventSource.Current.ServiceMessage(this.Context, "{0}", ex.ToString());
                    throw;
                }
            }
        }


        private void UpdateConfigSettings(ConfigurationSettings configSettings)
        {
            lock (ConfigPackageLockObject)
            {
                this.configPackageSettings = configSettings.Sections[ConfigSectionName].Parameters;
            }
        }

        private void CodePackageActivationContext_ConfigurationPackageModifiedEvent(object sender, PackageModifiedEventArgs<ConfigurationPackage> e)
        {
            this.UpdateConfigSettings(e.NewPackage.Settings);
        }

        private string GetSetting(string key)
        {
            lock (ConfigPackageLockObject)
            {
                return this.configPackageSettings[key].Value;
            }
        }

        private void InitConfig()
        {
            ConfigurationPackage configPackage = this.Context.CodePackageActivationContext.GetConfigurationPackageObject("Config");

            this.Context.CodePackageActivationContext.ConfigurationPackageModifiedEvent
                += this.CodePackageActivationContext_ConfigurationPackageModifiedEvent;

            this.UpdateConfigSettings(configPackage.Settings);
        }
    }
}
