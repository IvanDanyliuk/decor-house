import { AXIOS } from "../axios";

export const getCategories = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  const { data } = await AXIOS.get(
    '/api/categories', 
    { params: { page, itemsPerPage } }
  );
  return data;
};

export const getCategory = async (id: string) => {
  const { data } = await AXIOS.get(`/api/categories/${id}`);
  return data;
};