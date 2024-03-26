import StatsDetails from '@/components/stats/StatsDetails';
import { getStatsFilterData } from '@/lib/queries/stats.queries'


const Stats = async () => {
  const filtersData = await getStatsFilterData();

  return (
    <div className='py-3'>
      <StatsDetails data={filtersData} />
    </div>
  );
};

export default Stats;