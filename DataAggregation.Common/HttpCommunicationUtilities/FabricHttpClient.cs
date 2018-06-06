// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace System.Net.Http
{
    using DataAggregation.Common.Http;
    using DataAggregation.Common.Json;
    using DataAggregation.Common.ProtoStuff;
    using DataAggregation.Common.ServiceUtilities;
    using Microsoft.ServiceFabric.Services.Client;
    using Microsoft.ServiceFabric.Services.Communication.Client;
    using Newtonsoft.Json;
    using ProtoBuf;
    using System.Collections.Concurrent;
    using System.Fabric;
    using System.IO;
    using System.Net.Http.Headers;
    using System.Threading;
    using System.Threading.Tasks;

    public static class FabricHttpClient
    {
        private static readonly ConcurrentDictionary<Uri, bool?> addresses;
        private static readonly FabricClient fabricClient;
        private static readonly HttpClient httpClient;
        private static readonly HttpCommunicationClientFactory clientFactory;
        private static readonly JsonSerializer jSerializer;

        static FabricHttpClient()
        {
            addresses = new ConcurrentDictionary<Uri, bool?>();
            fabricClient = new FabricClient();
            HttpClientHandler handler = new HttpClientHandler();

            if (handler.SupportsAutomaticDecompression)
            {
                handler.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
            }

            httpClient = new HttpClient(handler);

            //https://stackoverflow.com/questions/7372585/protobuf-net-exception-timeout-while-inspecting-metadata
            //https://stackoverflow.com/questions/17096359/is-protobuf-net-thread-safe 
            //RuntimeTypeModel.Default.MetadataTimeoutMilliseconds = 300000;

            clientFactory = new HttpCommunicationClientFactory(
                ServicePartitionResolver.GetDefault(),
                "endpointName",
                TimeSpan.FromSeconds(10),
                TimeSpan.FromSeconds(5));

            jSerializer = new JsonSerializer();  //todo - see if creating this on the fly is better or not 
        }

        public static async Task<TReturn> MakeGetRequestAsync<TReturn>(
            Uri serviceName,
            ServicePartitionKey key,
            string endpointName,
            string requestPath,
            SerializationSelector selector,
            CancellationToken ct
        )
        {
            var servicePartitionClient = GetPartitionClient(serviceName, key, endpointName);
            HttpRequestMessage msg = CreateRequestMessage(null, HttpVerb.GET, selector);

            return await servicePartitionClient.InvokeWithRetryAsync<TReturn>(
                async (client) =>
                {
                    HttpResponseMessage response = null;
                    try
                    {
                        if (addresses.TryAdd(client.BaseAddress, true))
                        {
                            //https://aspnetmonsters.com/2016/08/2016-08-27-httpclientwrong/
                            //but then http://byterot.blogspot.co.uk/2016/07/singleton-httpclient-dns.html
                            //so we do this ala https://github.com/NimaAra/Easy.Common/blob/master/Easy.Common/RestClient.cs
                            ServicePointManager.FindServicePoint(client.BaseAddress).ConnectionLeaseTimeout = 60 * 1000;
                        }

                        Uri newUri = new Uri(client.BaseAddress, requestPath.TrimStart('/'));

                        msg.RequestUri = newUri;

                        response = await httpClient.SendAsync(msg);

                        if (selector == SerializationSelector.JSON)
                        {
                            return await ReturnJsonResult<TReturn>(response);
                        }
                        else
                        {
                            return await ReturnPBufResult<TReturn>(response);
                        }
                    }
                    catch (Exception e)
                    {
                        var x = e;
                        throw;
                    }
                }, ct);
        }

        public static async Task<bool> MakePostRequest<TPayload>(
            Uri serviceName,
            ServicePartitionKey key,
            string endpointName,
            string requestPath,
            TPayload payload,
            SerializationSelector selector,
            CancellationToken ct
        )
        {
            var servicePartitionClient = GetPartitionClient(serviceName, key, endpointName);
            HttpRequestMessage msg = CreateRequestMessage(payload, HttpVerb.POST, selector);

            return await servicePartitionClient.InvokeWithRetryAsync(
                async (client) =>
                {
                    HttpResponseMessage response = null;
                    try
                    {
                        if (addresses.TryAdd(client.BaseAddress, true))
                        {
                            //https://aspnetmonsters.com/2016/08/2016-08-27-httpclientwrong/
                            //but then http://byterot.blogspot.co.uk/2016/07/singleton-httpclient-dns.html
                            //so we do this ala https://github.com/NimaAra/Easy.Common/blob/master/Easy.Common/RestClient.cs
                            ServicePointManager.FindServicePoint(client.BaseAddress).ConnectionLeaseTimeout = 60 * 1000;
                        }

                        Uri newUri = new Uri(client.BaseAddress, requestPath.TrimStart('/'));

                        msg.RequestUri = newUri;

                        response = await httpClient.SendAsync(msg);

                        return response.IsSuccessStatusCode;
                    }
                    catch (Exception e)
                    {
                        var x = e;
                        throw;
                    }
                }, ct);

        }
        private static HttpRequestMessage CreateRequestMessage(object payload, HttpVerb verb, SerializationSelector selector)
        {
            HttpRequestMessage msg = new HttpRequestMessage();

            if (selector == SerializationSelector.PBUF)
            {
                msg.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-protobuf"));
            }
            else if (selector == SerializationSelector.JSON)
            {
                msg.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            }

            switch (verb)
            {
                case HttpVerb.GET:
                    msg.Method = HttpMethod.Get;
                    break;

                case HttpVerb.POST:
                    msg.Method = HttpMethod.Post;
                    break;
            }

            if (payload != null)
            {
                if (selector == SerializationSelector.JSON)
                {
                    msg.Content = new JsonContent(payload);
                }
                else if (selector == SerializationSelector.PBUF)
                {
                    msg.Content = new ProtoContent(payload);
                }
            }

            return msg;
        }

        private static async Task<TReturn> ReturnJsonResult<TReturn>(HttpResponseMessage response)
        {
            using (var stream = await response.Content.ReadAsStreamAsync())
            {
                using (var streamReader = new StreamReader(stream))
                {
                    using (JsonReader jsonReader = new JsonTextReader(streamReader))
                    {
                        return jSerializer.Deserialize<TReturn>(jsonReader);
                    }
                }
            }
        }

        private static async Task<TReturn> ReturnPBufResult<TReturn>(HttpResponseMessage response)
        {
            return Serializer.Deserialize<TReturn>(await response.Content.ReadAsStreamAsync());
        }

        private static ServicePartitionClient<HttpCommunicationClient> GetPartitionClient(Uri serviceName, ServicePartitionKey key, string endpointName)
        {
            return new ServicePartitionClient<HttpCommunicationClient>(
                clientFactory,
                serviceName,
                key,
                TargetReplicaSelector.Default,
                endpointName,
                new OperationRetrySettings()
                );
        }

    }
}
