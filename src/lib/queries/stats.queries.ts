import { AXIOS } from '../axios';


export const getStatsFilterData = async () => {
  const { data } = await AXIOS.get(
    '/api/stats/filters'
  );
  return data;
};

export const getStats = async ({ 
  categoryId, 
  periodFrom, 
  periodTo 
}: { 
  categoryId: string;
  periodFrom: string;
  periodTo: string;
}) => {
  const { data } = await AXIOS.get(
    '/api/stats',
    { params: { categoryId, periodFrom, periodTo } }
  );
  return data;
};