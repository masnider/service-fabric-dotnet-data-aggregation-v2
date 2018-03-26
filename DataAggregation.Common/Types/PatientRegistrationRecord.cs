using ProtoBuf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAggregation.Common.Types
{
    [ProtoContract]
    public struct PatientRegistrationRecord
    {
        [ProtoMember(1)]
        public Guid PatientId { get; private set; }
        [ProtoMember(2)]
        public string PatientName { get; private set; }
        [ProtoMember(3)]
        public HealthIndex PatientHealthIndex { get; private set; }

        public PatientRegistrationRecord(string name, Guid id, HealthIndex healthIndex)
        {
            this.PatientName = name;
            this.PatientId = id;
            this.PatientHealthIndex = healthIndex;
        }

    }
}
