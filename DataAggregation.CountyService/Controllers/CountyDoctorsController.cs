// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

namespace DataAggregation.CountyService
{
    using DataAggregation.Common;
    using DataAggregation.CountyService.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.ServiceFabric.Data;
    using Microsoft.ServiceFabric.Data.Collections;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    /// <summary>
    /// Votes controller.
    /// </summary>
    public class CountyDoctorsController : Controller
    {
        private const string DoctorServiceName = "DoctorActorService";
        private readonly IReliableStateManager stateManager;
        private readonly HealthIndexCalculator indexCalculator;

        public CountyDoctorsController(IReliableStateManager stateManager, HealthIndexCalculator indexCalculator)
        {
            this.stateManager = stateManager;
            this.indexCalculator = indexCalculator;
        }

        /// <summary>
        /// Returns { DoctorId, DoctorName, HealthStatus }
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("county/doctors/{countyId}")]
        public async Task<IEnumerable<KeyValuePair<Guid, CountyDoctorStats>>> Get(int countyId)
        {
            IReliableDictionary<Guid, CountyDoctorStats> countyHealth =
                await this.stateManager.GetOrAddAsync<IReliableDictionary<Guid, CountyDoctorStats>>(
                    string.Format(CountyService.CountyHealthDictionaryName, countyId));

            List<KeyValuePair<Guid, CountyDoctorStats>> doctors = new List<KeyValuePair<Guid, CountyDoctorStats>>();

            using (ITransaction tx = this.stateManager.CreateTransaction())
            {
                var enumerator = (await countyHealth.CreateEnumerableAsync(tx)).GetAsyncEnumerator();

                while (await enumerator.MoveNextAsync(CancellationToken.None))
                {
                    doctors.Add(enumerator.Current);
                }

                await tx.CommitAsync();
            }

            return doctors.OrderByDescending((x) => x.Value.AverageHealthIndex);

        }
    }
}