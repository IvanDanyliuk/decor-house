import { AXIOS } from '../axios';


export const getOrders = async ({ 
  page, 
  itemsPerPage, 
  email 
}: { 
  page?: string, 
  itemsPerPage?: string, 
  email?: string 
}) => {
  const { data } = await AXIOS.get(
    '/api/orders',
    { params: { page, itemsPerPage, email } }
  );
  return data;
};

export const getOrder = async (id: string) => {
  const { data } = await AXIOS.get(
    `/api/orders/${id}`,
    { params: { id } }
  );
  return data;
};