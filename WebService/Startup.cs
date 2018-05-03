using DataAggregation.Common.ProtoStuff;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.DependencyInjection;
using System.IO.Compression;

namespace DataAggregation.WebService
{
  public class Startup
  {
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc(options =>
      {
        options.InputFormatters.Add(new ProtobufInputFormatter());
        options.OutputFormatters.Add(new ProtobufOutputFormatter());
        options.FormatterMappings.SetMediaTypeMappingForFormat("protobuf", "application/x-protobuf");
      });

      services.AddResponseCompression(options =>
      {
        options.Providers.Add<GzipCompressionProvider>();
      });

      services.Configure<GzipCompressionProviderOptions>(options =>
      {
        options.Level = CompressionLevel.Optimal;
      });


    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseDeveloperExceptionPage();
      app.UseResponseCompression();
      app.UseStaticFiles();
      app.UseDefaultFiles();
      app.UseMvc();
    }
  }
}
