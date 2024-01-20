import { AXIOS } from '../axios';


export const getProducts = async ({ 
  page, 
  itemsPerPage, 
  category,
  type,
  features,
  manufacturer
}: { 
  page?: number, 
  itemsPerPage?: number, 
  category?: string;
  type?: string,
  features?: string,
  manufacturer?: string;
}) => {
  const { data } = await AXIOS.get(
    '/api/products', 
    { params: { 
        page, 
        itemsPerPage, 
        category, 
        type, 
        features, 
        manufacturer 
    } }
  );
  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await AXIOS.get(`/api/products/${id}`);
  return data;
};