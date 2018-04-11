﻿// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace DataAggregation.Common.Http
{
    using Microsoft.ServiceFabric.Services.Communication.Client;
    using System;
    using System.Fabric;

    /// <summary>
    /// Communication client that wraps the logic for talking to the service.
    /// Created by communication client factory.
    /// </summary>
    public class HttpCommunicationClient : ICommunicationClient
    {
        public HttpCommunicationClient(Uri baseAddress, string listenerName, TimeSpan operationTimeout, TimeSpan readWriteTimeout)
        {
            this.BaseAddress = baseAddress;

            var str = this.BaseAddress.ToString();

            if (!str.EndsWith("/"))
            {
                this.BaseAddress = new Uri(str + "/");
            }

            this.ListenerName = listenerName;
            this.OperationTimeout = operationTimeout;
            this.ReadWriteTimeout = readWriteTimeout;
        }


        ///// <summary>
        ///// The service base address.
        ///// </summary>
        public Uri BaseAddress { get; private set; }

        public TimeSpan OperationTimeout { get; set; }

        public TimeSpan ReadWriteTimeout { get; set; }

        public ResolvedServiceEndpoint Endpoint { get; set; }

        public string ListenerName { get; set; }

        public ResolvedServicePartition ResolvedServicePartition { get; set; }
    }
}