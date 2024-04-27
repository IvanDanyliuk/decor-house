import { AXIOS } from '../axios';

export const getShops = async ({ 
  page, 
  itemsPerPage, 
  country
}: { 
  page?: number; 
  itemsPerPage?: number; 
  country?: string;
}) => {
  const { data } = await AXIOS.get(
    'https://decor-house.vercel.app/api/shops', 
    { params: { page, itemsPerPage, country } }
  );
  return data;
};

export const getShop = async (id: string) => {
  const { data } = await AXIOS.get(`https://decor-house.vercel.app/api/shops/${id}`);
  return data;
};

export const getLocations = async () => {
  const { data } = await AXIOS.get('https://decor-house.vercel.app/api/shops/locations');
  return data;
};