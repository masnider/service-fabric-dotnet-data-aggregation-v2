using DataAggregation.Common;
using DataAggregation.Common.Http;
using DataAggregation.Common.ServiceUtilities;
using DataAggregation.Common.Types;
using DataAggregation.DoctorService.Models;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Communication.Client;
using Microsoft.ServiceFabric.Services.Runtime;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Fabric;
using System.Fabric.Description;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace DataAggregation.DeviceCreationService
{
    /// <summary>
    /// An instance of this class is created for each service instance by the Service Fabric runtime.
    /// </summary>
    public class DeviceCreationService : StatelessService
    {
        // This is the name of the ServiceType that is registered with FabricRuntime. 
        // This name must match the name defined in the ServiceManifest. If you change
        // this name, please change the name of the ServiceType in the ServiceManifest.
        public const string ServiceTypeName = "DataAggregation.DeviceCreationServiceType";

        private static FabricClient fabricClient = new FabricClient();
        private Uri ActorServiceUri;
        private Uri DoctorServiceUri;
        private int NumberOfCreationThreads;
        private int MaxDevicesToCreatePerService;

        private ConcurrentDictionary<int, ServicePartitionClient<HttpCommunicationClient>> communicationClientDictionary =
            new ConcurrentDictionary<int, ServicePartitionClient<HttpCommunicationClient>>();

        public DeviceCreationService(StatelessServiceContext serviceContext) : base(serviceContext)
        {
        }

        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            ConfigurationSettings configSettings = FabricRuntime.GetActivationContext().GetConfigurationPackageObject("Config").Settings;
            KeyedCollection<string, ConfigurationProperty> serviceParameters = configSettings.Sections["DataAggregation.DeviceCreationService.Settings"].Parameters;

            this.NumberOfCreationThreads = int.Parse(serviceParameters["NumberOfCreationThreads"].Value);
            this.MaxDevicesToCreatePerService = int.Parse(serviceParameters["MaxDevicesToCreatePerServiceInstance"].Value);
            this.ActorServiceUri = new ServiceUriBuilder(serviceParameters["DeviceActorServiceName"].Value).ToUri();
            this.DoctorServiceUri = new ServiceUriBuilder(serviceParameters["DoctorServiceInstanceName"].Value).ToUri();

            string dataPath = FabricRuntime.GetActivationContext().GetDataPackageObject("Data").Path;
            DeviceActorGenerator bag = new DeviceActorGenerator(configSettings, dataPath);

            bag.Prepare();

            List<Task> tasks = new List<Task>();

            for (int i = 0; i < this.NumberOfCreationThreads; i++)
            {
                tasks.Add(Task.Run(() => this.CreateDeviceActorAsync(bag, cancellationToken), cancellationToken));
            }

            ServiceEventSource.Current.ServiceMessage(this.Context, "Device Creation has begun.");
            await Task.WhenAll(tasks);
            ServiceEventSource.Current.ServiceMessage(this.Context, "Device Creation has completed.");
        }

        private async Task CreateDeviceActorAsync(DeviceActorGenerator bag, CancellationToken cancellationToken)
        {
            //TODO: Should be able to replace this with a normal Random
            CryptoRandom random = new CryptoRandom();

            while (!cancellationToken.IsCancellationRequested && this.MaxDevicesToCreatePerService > 0)
            {
                bool created = false;
                while (!created && !cancellationToken.IsCancellationRequested)
                {
                    ActorId bandActorId;
                    Guid doctorId;
                    int randomCountyId = -1;
                    string doctorName = null;

                    randomCountyId = random.Next(0, bag.doctorsPerCounty.Keys.Count);
                    doctorName = bag.GetRandomName(random);

                    CountyRecord randomCountyRecord = bag.doctorsPerCounty.Keys.ElementAt(randomCountyId);
                    DeviceInfo bandActorInfo = bag.GetRandomHealthStatus(randomCountyRecord, random);

                    try
                    {
                        bandActorId = new ActorId(Guid.NewGuid());
                        doctorId = bandActorInfo.DoctorId;
                        //doctorId = new ActorId(bandActorInfo.DoctorId);

                        var dcr = new DoctorCreationRecord(doctorName, doctorId, randomCountyRecord);
                        ServicePartitionKey key = new ServicePartitionKey(HashUtil.getLongHashCode(bandActorInfo.DoctorId.ToString()));

                        await FabricHttpClient.MakePostRequest<DoctorCreationRecord>(
                            this.DoctorServiceUri,
                            key,
                            "DoctorEndpoint",
                            "/doctor/new/" + doctorId,
                            dcr,
                            SerializationSelector.PBUF,
                            cancellationToken
                            );

                        IDeviceActor bandActor = ActorProxy.Create<IDeviceActor>(bandActorId, ActorServiceUri);
                        await bandActor.NewAsync(bandActorInfo);

                        ServiceEventSource.Current.Message("Actor created {0} verifying...", bandActorId);

                        created = true;
                    }

                    catch (Exception e)
                    {
                        ServiceEventSource.Current.ServiceMessage(this.Context, "Failed to iniitalize device or doctor. {0}", e.ToString());
                    }
                }

                this.MaxDevicesToCreatePerService--;

                ServiceEventSource.Current.ServiceMessage(this.Context, "Created Actors, {0} remaining", this.MaxDevicesToCreatePerService);

                await Task.Delay(100, cancellationToken);
            }
        }
    }
}
