﻿// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace DataAggregation.Common.Types
{
    using ProtoBuf;
    //using System.Runtime.Serialization;

    [ProtoContract]
    public class CountyStatsViewModel
    {
        public CountyStatsViewModel()
        {
        }

        public CountyStatsViewModel(int doctorCount, int patientCount, long healthReportCount, HealthIndex averageHealthIndex)
        {
            this.AverageHealthIndex = averageHealthIndex;
            this.DoctorCount = doctorCount;
            this.PatientCount = patientCount;
            this.HealthReportCount = healthReportCount;
        }

        [ProtoMember(1)]
        public int DoctorCount { get; private set; }

        [ProtoMember(2)]
        public int PatientCount { get; private set; }

        [ProtoMember(3)]
        public long HealthReportCount { get; private set; }

        [ProtoMember(4)]
        public HealthIndex AverageHealthIndex { get; private set; }

        public override string ToString()
        {
            return string.Format("DC:{0}-PC:{1}-HRC:{2}-HI{3}", this.DoctorCount, this.PatientCount, this.HealthReportCount, this.AverageHealthIndex);
        }
    }
}