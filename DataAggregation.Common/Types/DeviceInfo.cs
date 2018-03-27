// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace DataAggregation.Common.Types
{
    using System;
    using System.Runtime.Serialization;
    using DataAggregation.Common.ServiceUtilities;

    [DataContract]
    public struct DeviceInfo
    {
        [DataMember]
        public Guid DoctorId { get; set; }

        [DataMember]
        public CountyRecord CountyInfo { get; set; }

        [DataMember]
        public HealthIndex HealthIndex { get; set; }

        [DataMember]
        public string PersonName { get; set; }

        public static bool operator ==(DeviceInfo a, DeviceInfo b)
        {
            if (a.DoctorId == b.DoctorId
                && a.CountyInfo == b.CountyInfo
                && a.HealthIndex == b.HealthIndex
                && a.PersonName == b.PersonName)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool operator !=(DeviceInfo a, DeviceInfo b)
        {
            return !(a == b);
        }

        public override bool Equals(object obj)
        {
            return (this == (DeviceInfo) obj);
        }

        public override int GetHashCode()
        {
            return HashUtil.getIntHashCode(this.ToString());  //TODO - Scrub all custom types for consistent hash implementation
        }
    }
}