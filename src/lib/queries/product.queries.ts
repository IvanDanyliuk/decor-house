import { AXIOS } from '../axios';


export const getProducts = async ({ 
  page, 
  itemsPerPage, 
  category,
  manufacturer
}: { 
  page?: number, 
  itemsPerPage?: number, 
  category?: string;
  manufacturer?: string;
}) => {
  const { data } = await AXIOS.get(
    '/api/products', 
    { params: { page, itemsPerPage, category, manufacturer } }
  );
  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await AXIOS.get(`/api/products/${id}`);
  return data;
};