import { AXIOS } from '../axios';


export const getProducts = async ({ 
  page, 
  itemsPerPage, 
  searchParams,
}: { 
  page?: number, 
  itemsPerPage?: number, 
  searchParams?: {
    category?: string;
    manufacturer?: string; 
  }
}) => {
  const { data } = await AXIOS.get(
    '/api/products', 
    { params: { page, itemsPerPage, searchParams } }
  );
  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await AXIOS.get(`/api/products/${id}`);
  return data;
};