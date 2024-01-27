import { AXIOS } from '../axios';

export const getPromotions = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  const { data } = await AXIOS.get(
    '/api/promotions', 
    { params: { page, itemsPerPage } }
  );
  return data;
};

export const getPromotion = async (id: string) => {
  const { data } = await AXIOS.get(`/api/promotions/${id}`);
  return data;
};