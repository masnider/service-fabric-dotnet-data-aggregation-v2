﻿using DataAggregation.NationalService.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using Microsoft.ServiceFabric.Data.Notifications;
using Microsoft.ServiceFabric.Services.Communication.AspNetCore;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Fabric;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace DataAggregation.NationalService
{
    /// <summary>
    /// The FabricRuntime creates an instance of this class for each service type instance. 
    /// </summary>
    /// 
    public class NationalService : StatefulService
    {
        public const string ServiceTypeName = "DataAggregation.NationalServiceType";
        private const string HealthStatusDictionary = "healthStatusDictionary";
        private const string TimeStatsDictionary = "TimeTracker";
        private readonly ConcurrentDictionary<string, long> statsDictionary = new ConcurrentDictionary<string, long>();
        private readonly ConcurrentDictionary<int, DataSet> historyDictionary = new ConcurrentDictionary<int, DataSet>();
        private ConcurrentBag<int> updatedCounties = new ConcurrentBag<int>();

        public NationalService(StatefulServiceContext serviceContext) : base(serviceContext)
        {
            this.StateManager.StateManagerChanged += this.StateManager_StateManagerChanged;
            this.StateManager.TryAddStateSerializer<NationalCountyStats>(new NationalCountyStatsSerializer());
            InitStats();
        }

        public NationalService(StatefulServiceContext serviceContext, IReliableStateManagerReplica reliableStateManagerReplica)
            : base(serviceContext, reliableStateManagerReplica)
        {
            this.StateManager.StateManagerChanged += this.StateManager_StateManagerChanged;
            this.StateManager.TryAddStateSerializer<NationalCountyStats>(new NationalCountyStatsSerializer());
            InitStats();
        }

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
                                            .AddSingleton<ConcurrentBag<int>>(updatedCounties)
                                            .AddSingleton<ConcurrentDictionary<string,long>>(statsDictionary))
                                    .UseContentRoot(Directory.GetCurrentDirectory())
                                    .UseStartup<Startup>()
                                    .UseServiceFabricIntegration(listener, ServiceFabricIntegrationOptions.UseUniqueServiceUrl)
                                    .UseUrls(url)
                                    .Build();
                    }
                    );
                }, "NationalEndpoint")};
        }

        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            int retryCount = 0;

            while (!cancellationToken.IsCancellationRequested && retryCount < 5)
            {
                try
                {
                    IReliableDictionary<string, DateTimeOffset> timeDictionary =
                        await this.StateManager.GetOrAddAsync<IReliableDictionary<string, DateTimeOffset>>("TimeTracker");

                    using (ITransaction tx = this.StateManager.CreateTransaction())
                    {
                        ConditionalValue<DateTimeOffset> result = await timeDictionary.TryGetValueAsync(tx, "StartTime");
                        if (!result.HasValue)
                        {
                            await timeDictionary.SetAsync(tx, "StartTime", DateTimeOffset.UtcNow);
                        }

                        await tx.CommitAsync();
                    }

                    return;
                }
                catch (TimeoutException te)
                {
                    // transient error. Retry.
                    retryCount++;
                    ServiceEventSource.Current.ServiceMessage(
                        this.Context,
                        "NationalService encountered an exception trying to record start time: TimeoutException in RunAsync: {0}",
                        te.ToString());
                    continue;
                }
                catch (FabricNotReadableException)
                {
                    // transient error. Retry.
                    retryCount++;
                    continue;
                }
                catch (FabricTransientException fte)
                {
                    // transient error. Retry.
                    retryCount++;
                    ServiceEventSource.Current.ServiceMessage(
                        this.Context,
                        "NationalService encountered an exception trying to record start time: FabricTransientException in RunAsync: {0}",
                        fte.ToString());
                    continue;
                }
                catch (FabricNotPrimaryException)
                {
                    // not primary any more, time to quit.
                    return;
                }
                catch (Exception ex)
                {
                    ServiceEventSource.Current.ServiceMessage(this.Context, ex.ToString());
                    throw;
                }
            }
        }

        private void StateManager_StateManagerChanged(object sender, NotifyStateManagerChangedEventArgs e)
        {
            if (e.Action == NotifyStateManagerChangedAction.Add)
            {
                NotifyStateManagerSingleEntityChangedEventArgs args = e as NotifyStateManagerSingleEntityChangedEventArgs;
                if (args.ReliableState.Name.ToString() == "urn:" + HealthStatusDictionary)
                {
                    IReliableDictionary<int, NationalCountyStats> dictionary = (IReliableDictionary<int, NationalCountyStats>)args.ReliableState;
                    dictionary.DictionaryChanged += this.Dictionary_DictionaryChanged;
                }
            }
        }

        private void Dictionary_DictionaryChanged(object sender, NotifyDictionaryChangedEventArgs<int, NationalCountyStats> e)
        {
            switch (e.Action)
            {
                case NotifyDictionaryChangedAction.Clear:
                    return;

                case NotifyDictionaryChangedAction.Add:
                    NotifyDictionaryItemAddedEventArgs<int, NationalCountyStats> addEvent = e as NotifyDictionaryItemAddedEventArgs<int, NationalCountyStats>;

                    long tmp = -1;

                    if (this.statsDictionary.TryGetValue("totalDoctors", out tmp))
                    {
                        this.statsDictionary["totalDoctors"] += addEvent.Value.DoctorCount;
                        this.statsDictionary["totalPatientCount"] += addEvent.Value.PatientCount;
                        this.statsDictionary["totalHealthReportCount"] += addEvent.Value.HealthReportCount;
                    }
                    else
                    {
                        this.statsDictionary["totalDoctors"] = addEvent.Value.DoctorCount;
                        this.statsDictionary["totalPatientCount"] = addEvent.Value.PatientCount;
                        this.statsDictionary["totalHealthReportCount"] = addEvent.Value.HealthReportCount;
                    }

                    this.historyDictionary[addEvent.Key] = new DataSet(
                        addEvent.Value.DoctorCount,
                        addEvent.Value.PatientCount,
                        addEvent.Value.HealthReportCount);
                    return;

                case NotifyDictionaryChangedAction.Update:
                    NotifyDictionaryItemUpdatedEventArgs<int, NationalCountyStats> updateEvent =
                        e as NotifyDictionaryItemUpdatedEventArgs<int, NationalCountyStats>;
                    this.statsDictionary["totalDoctors"] += (updateEvent.Value.DoctorCount - this.historyDictionary[updateEvent.Key].totalDoctors);
                    this.statsDictionary["totalPatientCount"] += (updateEvent.Value.PatientCount - this.historyDictionary[updateEvent.Key].totalPatientCount);
                    this.statsDictionary["totalHealthReportCount"] +=
                        (updateEvent.Value.HealthReportCount - this.historyDictionary[updateEvent.Key].totalHealthReportCount);
                    this.historyDictionary[updateEvent.Key] = new DataSet(
                        updateEvent.Value.DoctorCount,
                        updateEvent.Value.PatientCount,
                        updateEvent.Value.HealthReportCount);
                    return;

                case NotifyDictionaryChangedAction.Remove:
                    return;

                default:
                    break;
            }
        }

        private void InitStats()
        {
            this.statsDictionary["totalDoctors"] = 0;
            this.statsDictionary["totalPatientCount"] = 0;
            this.statsDictionary["totalHealthReportCount"] = 0;
        }
    }

    struct DataSet
    {
        public long totalDoctors;
        public long totalPatientCount;
        public long totalHealthReportCount;

        public DataSet(long doctors, long patients, long reports)
        {
            this.totalDoctors = doctors;
            this.totalPatientCount = patients;
            this.totalHealthReportCount = reports;
        }
    }

}
