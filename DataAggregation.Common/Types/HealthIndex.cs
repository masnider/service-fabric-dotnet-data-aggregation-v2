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
    public struct HealthIndex : IComparable, IComparable<HealthIndex>, IEquatable<HealthIndex>
    {
        [DataMember]
        [ProtoMember(1)]
        private int value;


        [DataMember]
        [ProtoMember(2)]
        private bool mode;

        public HealthIndex(int value, bool mode)
        {
            this.value = value;
            this.mode = mode;
        }

        public int CompareTo(HealthIndex other)
        {
            return this.value.CompareTo(other.value);
        }

        public static bool operator ==(HealthIndex item1, HealthIndex item2)
        {
            return item1.Equals(item2);
        }

        public static bool operator !=(HealthIndex item1, HealthIndex item2)
        {
            return !item1.Equals(item2);
        }

        public static bool operator >(HealthIndex item1, HealthIndex item2)
        {
            return item1.value > item2.value;
        }

        public static bool operator >=(HealthIndex item1, HealthIndex item2)
        {
            return item1.value >= item2.value;
        }

        public static bool operator <(HealthIndex item1, HealthIndex item2)
        {
            return item1.value < item2.value;
        }

        public static bool operator <=(HealthIndex item1, HealthIndex item2)
        {
            return item1.value <= item2.value;
        }

        public int CompareTo(object obj)
        {
            return this.CompareTo((HealthIndex)obj);
        }

        public bool Equals(HealthIndex other)
        {
            return (this.value.Equals(other.value) && this.mode.Equals(other.mode));
        }

        public override bool Equals(object obj)
        {
            if (obj is HealthIndex)
            {
                return this.Equals((HealthIndex)obj);
            }

            return false;
        }

        public override string ToString()
        {
            return this.value.ToString();
        }

        public override int GetHashCode()
        {
            return this.value.GetHashCode();
        }

        public int GetValue()
        {
            return this.value;
        }
    }
}