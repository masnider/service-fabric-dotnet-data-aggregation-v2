using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO;

namespace WebService
{
  public class Startup
  {
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services
          .Configure<GzipCompressionProviderOptions>(options =>
          {
            options.Level = System.IO.Compression.CompressionLevel.Optimal;
          })
          .AddResponseCompression(options =>
          {
            options.Providers.Add<GzipCompressionProvider>();
          }
          )
          .AddMvc(options =>
          {
                  //options.InputFormatters.Add(new ProtobufInputFormatter());
                  //options.OutputFormatters.Add(new ProtobufOutputFormatter());
                  //options.FormatterMappings.SetMediaTypeMappingForFormat("protobuf", "application/x-protobuf");
                }
          );

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      //app.Use(async (context, next) =>
      //{
      //  await next();
      //  if (context.Response.StatusCode == 404 &&
      //     !Path.HasExtension(context.Request.Path.Value) &&
      //     !context.Request.Path.Value.StartsWith("/api/"))
      //  {
      //    context.Request.Path = "/index.html";
      //    await next();
      //  }
      //});

      app.UseDeveloperExceptionPage();
      app.UseResponseCompression();
      app.UseStaticFiles();
      app.UseDefaultFiles();
      app.UseMvc();
    }
  }
}
