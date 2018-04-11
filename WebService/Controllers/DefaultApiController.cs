using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Fabric.Description;

namespace DataAggregation.WebService
{
  [Route("api")]
  public class DefaultApiController : Controller
  {
    private readonly KeyedCollection<string, ConfigurationProperty> configPackageSettings;
    public DefaultApiController()
    {
      //this.configPackageSettings = FabricRuntime.GetActivationContext().GetConfigurationPackageObject("Config").Settings.Sections["HealthMetrics.WebService.Settings"].Parameters;
    }

    // GET: api
    public IEnumerable<string> Get()
    {
      Random r = new Random();
      return new string[] { "value1" + r.Next(), "value2" + r.Next() };
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

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return string.Format("value:{0}", id);
    }
  }
}
