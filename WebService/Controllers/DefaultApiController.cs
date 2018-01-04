using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Fabric;
using System.Fabric.Description;
using System.Collections.ObjectModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebService
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
      return new string[] { "value1", "value2" };
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return string.Format("value:{0}", id);
    }
  }
}
