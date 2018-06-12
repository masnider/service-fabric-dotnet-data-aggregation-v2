﻿// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace DataAggregation.Common.Types
{
    using ProtoBuf;
    using System;
    using System.Runtime.Serialization;

    [DataContract]
    [ProtoContract]
    public struct NationalStatsViewModel
    {
        public NationalStatsViewModel(long doctorCount, long patientCount, long healthReportCount, DateTimeOffset creationDateTime)
        {
            this.DoctorCount = doctorCount;
            this.PatientCount = patientCount;
            this.HealthReportCount = healthReportCount;
            this.StartTimeOffset = creationDateTime;
        }

        [DataMember]
        [ProtoMember(1)]
        public long DoctorCount { get; private set; }

        [DataMember]
        [ProtoMember(2)]
        public long PatientCount { get; private set; }

        [DataMember]
        [ProtoMember(3)]
        public long HealthReportCount { get; private set; }

        [DataMember]
        [ProtoMember(4)]
        public DateTimeOffsetSurrogate StartTimeOffset { get; set; }

    }
}