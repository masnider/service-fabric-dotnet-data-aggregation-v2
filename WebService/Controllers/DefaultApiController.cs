using DataAggregation.Common;
using DataAggregation.Common.ServiceUtilities;
using DataAggregation.Common.Types;
using DataAggregation.CountyService.Models;
using DataAggregation.DeviceCreationService;
using DataAggregation.NationalService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using Microsoft.ServiceFabric.Actors.Query;
using Microsoft.ServiceFabric.Services.Client;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Fabric;
using System.Fabric.Description;
using System.Fabric.Query;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace DataAggregation.WebService
{
  [Route("api")]
  public class DefaultApiController : Controller
  {
    private readonly KeyedCollection<string, ConfigurationProperty> configPackageSettings;
    private readonly string DeviceServiceName = "DeviceActorServiceName";
    private readonly string CountyServiceName = "CountyServiceInstanceName";
    private readonly string NationalServiceName = "NationalServiceInstanceName";

    public DefaultApiController()
    {
      this.configPackageSettings = FabricRuntime.GetActivationContext().GetConfigurationPackageObject("Config").Settings.Sections["DataAggregation.WebService.Settings"].Parameters;
    }

    [HttpGet]
    [Route("settings/{setting}")]
    public Task<string> GetSettingValue(string setting)
    {
      return Task.FromResult<string>(this.GetSetting(setting));
    }

    [HttpGet]
    [Route("national/health")]
    public async Task<List<CountyHealth>> GetNationalHealth()
    {
      try
      {
        ServiceUriBuilder serviceUri = new ServiceUriBuilder(this.GetSetting(NationalServiceName));

        var result = await FabricHttpClient.MakeGetRequestAsync<List<CountyHealth>>(
            serviceUri.ToUri(),
            new ServicePartitionKey(),
            "NationalEndpoint",
            "/national/health",
            SerializationSelector.PBUF,
            CancellationToken.None
            );

        return result;
      }
      catch (Exception e)
      {
        ServiceEventSource.Current.Message("Exception in Web API Controller getting national health {0}", e);
        throw;
      }
    }

    [HttpGet]
    [Route("mapData")]
    public List<string[]> GetMapData()
    {
      Random r = new Random();
      List<string[]> mapData = new List<string[]>();

      for (int i = 1001; i <= 56045; i++)
      {

        var num = i.ToString();

        if (num.Length == 4)
        {
          num.PadLeft(5, '0');
        }

        mapData.Add(new string[] { i.ToString(), r.Next(0, 101).ToString() });
      }

      return mapData;
    }

    [HttpGet]
    [Route("chartData")]
    public string GetChartData()
    {
      Random r = new Random();
      List<object> chartData = new List<object>();
      DateTime d = DateTime.Today - TimeSpan.FromDays(30);

      for (int i = 0; i < 30; i++)
      {
        chartData.Add(
            new
            {
              date = d.ToString(),
              close = (r.NextDouble() * 1000).ToString().Substring(0, 5)
            }
          );

        d = d.AddDays(1);
      }

      return JsonConvert.SerializeObject(chartData.ToArray());

      //      1 - May - 12,58.13
      //30 - Apr - 12,53.98
      //27 - Apr - 12,67
      //26 - Apr - 12,89.7
      //25 - Apr - 12,99
      //24 - Apr - 12,130.28
      //23 - Apr - 12,166.7
      //20 - Apr - 12,234.98
      //19 - Apr - 12,345.44
      //18 - Apr - 12,443.34
      //17 - Apr - 12,543.7
      //16 - Apr - 12,580.13
      //13 - Apr - 12,605.23
      //12 - Apr - 12,622.77
      //11 - Apr - 12,626.2
      //10 - Apr - 12,628.44
      //9 - Apr - 12,636.23
      //5 - Apr - 12,633.68
      //4 - Apr - 12,624.31
      //3 - Apr - 12,629.32
      //2 - Apr - 12,618.63
      //30 - Mar - 12,599.55
      //29 - Mar - 12,609.86
      //28 - Mar - 12,617.62
      //27 - Mar - 12,614.48
      //26 - Mar - 12,606.98

    }

    [HttpGet]
    [Route("national/stats")]
    public async Task<NationalStatsViewModel> GetNationalStats()
    {
      try
      {

        ServiceUriBuilder serviceUri = new ServiceUriBuilder(this.GetSetting(NationalServiceName));
        var key = new ServicePartitionKey();
        var result = await FabricHttpClient.MakeGetRequestAsync<NationalStatsViewModel>(
            serviceUri.ToUri(),
            key,
            "NationalEndpoint",
            "/national/stats",
            SerializationSelector.PBUF,
            CancellationToken.None
            );

        return result;
      }
      catch (Exception e)
      {
        ServiceEventSource.Current.Message("Exception in Web API Controller getting national stats {0}", e);
        throw;
      }
    }

    [HttpGet]
    [Route("county/{countyId}/doctors/")]
    public async Task<IEnumerable<KeyValuePair<Guid, CountyDoctorStats>>> GetDoctors(int countyId)
    {
      try
      {
        ServiceUriBuilder serviceUri = new ServiceUriBuilder(this.GetSetting(CountyServiceName));

        var result = await FabricHttpClient.MakeGetRequestAsync<IEnumerable<KeyValuePair<Guid, CountyDoctorStats>>>(
            serviceUri.ToUri(),
            new ServicePartitionKey(countyId),
            "CountyEndpoint",
            "/county/doctors/" + countyId,
            SerializationSelector.PBUF,
            CancellationToken.None
            );

        return result;
      }
      catch (Exception e)
      {
        ServiceEventSource.Current.Message("Exception in Web API Controller getting county {0} doctors: {1}", countyId, e);
        throw;
      }
    }

    [HttpGet]
    [Route("county/{countyId}/health/")]
    public async Task<HealthIndex> GetCountyHealth(int countyId)
    {

      try
      {
        ServiceUriBuilder serviceUri = new ServiceUriBuilder(this.GetSetting(CountyServiceName));

        var result = await FabricHttpClient.MakeGetRequestAsync<HealthIndex>(
            serviceUri.ToUri(),
            new ServicePartitionKey(countyId),
            "CountyEndpoint",
            "/county/health/" + countyId,
            SerializationSelector.PBUF,
            CancellationToken.None
            );

        return result;
      }
      catch (Exception e)
      {
        ServiceEventSource.Current.Message("Exception in Web API Controller getting county {0} health {1}", countyId, e);
        throw;
      }
    }

    [HttpGet]
    [Route("patients/{deviceId}")]
    public async Task<DeviceDataViewModel> GetPatientData(Guid deviceId)
    {
      try
      {
        ActorId deviceActorid = new ActorId(deviceId);
        ServiceUriBuilder serviceUri = new ServiceUriBuilder(this.GetSetting(DeviceServiceName));

        IDeviceActor actor = ActorProxy.Create<IDeviceActor>(deviceActorid, serviceUri.ToUri());
        var result = await actor.GetDeviceDataAsync();


        return result;
      }
      catch (AggregateException ae)
      {
        ServiceEventSource.Current.Message("Exception in Web ApiController {0}", ae.InnerException);
        throw ae.InnerException;
      }
    }

    [HttpGet]
    [Route("GetIds")]
    public async Task<KeyValuePair<string, string>> GetPatientId()
    {
      return await this.GetRandomIdsAsync();
    }

    private string GetSetting(string key)
    {
      return this.configPackageSettings[key].Value;
    }

    private async Task<KeyValuePair<string, string>> GetRandomIdsAsync()
    {
      ServiceUriBuilder serviceUri = new ServiceUriBuilder(this.GetSetting(DeviceServiceName));
      Uri fabricServiceName = serviceUri.ToUri();

      CancellationTokenSource cts = new CancellationTokenSource(TimeSpan.FromMinutes(5));
      CancellationToken token = cts.Token;
      FabricClient fc = new FabricClient();
      ServicePartitionList partitions = await fc.QueryManager.GetPartitionListAsync(fabricServiceName);

      string doctorId = null;

      while (!token.IsCancellationRequested && doctorId == null)
      {
        try
        {
          foreach (Partition p in partitions)
          {
            long partitionKey = ((Int64RangePartitionInformation)p.PartitionInformation).LowKey;
            token.ThrowIfCancellationRequested();
            ContinuationToken queryContinuationToken = null;
            IActorService proxy = ActorServiceProxy.Create(fabricServiceName, partitionKey);
            PagedResult<ActorInformation> result = await proxy.GetActorsAsync(queryContinuationToken, token);
            foreach (ActorInformation info in result.Items)
            {
              token.ThrowIfCancellationRequested();

              ActorId deviceActorId = info.ActorId;
              IDeviceActor deviceActor = ActorProxy.Create<IDeviceActor>(deviceActorId, fabricServiceName);

              try
              {
                doctorId = (await deviceActor.GetAssociatedDoctorAsync()).ToString();

                return new KeyValuePair<string, string>(deviceActorId.ToString(), doctorId);
              }
              catch (Exception e)
              {
                ServiceEventSource.Current.Message("Exception when obtaining actor ID. No State? " + e.ToString());
                continue;
              }

            }
            //otherwise we will bounce around other partitions until we find an actor
          }
        }
        catch (Exception e)
        {
          ServiceEventSource.Current.Message("Exception when obtaining actor ID: " + e.ToString());
          continue;
        }
      }

      throw new InvalidOperationException("Couldn't find actor within timeout");
    }
  }
}
