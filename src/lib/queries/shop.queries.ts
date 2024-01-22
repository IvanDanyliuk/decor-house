import { AXIOS } from '../axios';

export const getShops = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  const { data } = await AXIOS.get(
    '/api/shops', 
    { params: { page, itemsPerPage } }
  );
  return data;
};

export const getShop = async (id: string) => {
  const { data } = await AXIOS.get(`/api/shops/${id}`);
  return data;
};