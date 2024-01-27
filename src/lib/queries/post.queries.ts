import { AXIOS } from '../axios';

export const getPosts = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  const { data } = await AXIOS.get(
    '/api/posts', 
    { params: { page, itemsPerPage } }
  );
  return data;
};

export const getPost = async (id: string) => {
  const { data } = await AXIOS.get(`/api/posts/${id}`);
  return data;
};