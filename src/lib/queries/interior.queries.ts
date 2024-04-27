import { AXIOS } from '../axios';


export const getInteriors = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  const { data } = await AXIOS.get(
    'https://decor-house.vercel.app/api/interiors',
    { params: { page, itemsPerPage } }
  );
  return data;
};

export const getInterior = async (id: string) => {
  const { data } = await AXIOS.get(`https://decor-house.vercel.app/api/interiors/${id}`);
  return data;
};