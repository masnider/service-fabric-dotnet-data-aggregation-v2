// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace DataAggregation.NationalService.Models
{
    using DataAggregation.Common.Types;
    using ProtoBuf;

    [ProtoContract]
    public struct CountyHealth
    {
        [ProtoMember(1)]
        public int Id { get; set; }

        [ProtoMember(2)]
        public HealthIndex Health { get; set; }
    }
}