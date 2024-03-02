import { AXIOS } from '../axios';

export const getPromotions = async ({ 
  page, 
  itemsPerPage, 
  period
}: { 
  page?: number;
  itemsPerPage?: number;
  period?: string;
}) => {
  const { data } = await AXIOS.get(
    '/api/promotions', 
    { params: { page, itemsPerPage, period } }
  );
  return data;
};

export const getPromotion = async (id: string) => {
  const { data } = await AXIOS.get(`/api/promotions/${id}`);
  return data;
};