import { AXIOS } from '../axios';

export const getManufacturers = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  const { data } = await AXIOS.get(
    'https://decor-house.vercel.app/api/manufacturers', 
    { params: { page, itemsPerPage } }
  );
  return data;
};

export const getManufacturer = async (id: string) => {
  const { data } = await AXIOS.get(`https://decor-house.vercel.app/api/manufacturers/${id}`);
  return data;
};