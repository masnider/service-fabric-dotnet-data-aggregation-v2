// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace DataAggregation.CountyService.Models
{
    using Microsoft.ServiceFabric.Data;
    using ProtoBuf;
    using ProtoBuf.Meta;
    using System.IO;

    class CountyDoctorStatsSerializer : IStateSerializer<CountyDoctorStats>
    {

        public CountyDoctorStatsSerializer()
        {
            //https://stackoverflow.com/questions/7372585/protobuf-net-exception-timeout-while-inspecting-metadata
            //https://stackoverflow.com/questions/17096359/is-protobuf-net-thread-safe 
            RuntimeTypeModel.Default.MetadataTimeoutMilliseconds = 300000;
        }

        public CountyDoctorStats Read(BinaryReader binaryReader)
        {
            return Serializer.Deserialize<CountyDoctorStats>(binaryReader.BaseStream);
        }

        public void Write(CountyDoctorStats value, BinaryWriter binaryWriter)
        {
            Serializer.Serialize<CountyDoctorStats>(binaryWriter.BaseStream, value);
        }

        public void Write(CountyDoctorStats baseValue, CountyDoctorStats targetValue, BinaryWriter binaryWriter)
        {
            Write(targetValue, binaryWriter);
        }

        public CountyDoctorStats Read(CountyDoctorStats baseValue, BinaryReader binaryReader)
        {
            return Read(binaryReader);
        }

    }
}
