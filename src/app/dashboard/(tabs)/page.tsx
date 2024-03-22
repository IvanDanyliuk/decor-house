import StatsDetails from '@/components/stats/StatsDetails';
import { getStats, getStatsFilterData } from '@/lib/queries/stats.queries'
import React from 'react'

const Stats = async () => {
  const filtersData = await getStatsFilterData();

  return (
    <div>
      <StatsDetails data={filtersData} />
    </div>
  );
};

export default Stats;