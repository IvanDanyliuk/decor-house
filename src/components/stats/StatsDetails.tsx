'use client';

import { useState, useEffect } from 'react';
import { getStats } from '@/lib/queries/stats.queries';
import { ICategory } from '@/lib/types/category.types';


interface IStatsDetails {
  data: {
    categories: ICategory[];
    periodFrom: string;
    periodTo: string;
  }
}

interface IPeriod {
  from: string;
  to: string;
}

const StatsDetails: React.FC<IStatsDetails> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(data.categories[0]);
  const [period, setPeriod] = useState<IPeriod>({ 
    from: data.periodFrom, 
    to: data.periodTo 
  });
  const [statsData, setStatsData] = useState<any | null>(null)

  useEffect(() => {
    getStats({ 
      // categoryId: selectedCategory._id!, 
      categoryId: '65881ca86009bbfaae701a8f',
      periodFrom: period.from, 
      periodTo: period.to 
    }).then(res => setStatsData(res));
  }, [selectedCategory, period]);

  useEffect(() => {
    console.log('STATS', statsData)
  }, [statsData])

  return (
    <div>StatsDetails</div>
  );
};

export default StatsDetails;