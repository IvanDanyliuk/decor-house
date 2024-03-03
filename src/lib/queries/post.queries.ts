import { AXIOS } from '../axios';

export const getPosts = async ({ 
  page, 
  itemsPerPage, 
  tags
}: { 
  page?: number;
  itemsPerPage?: number;
  tags?: string;
}) => {
  const { data } = await AXIOS.get(
    '/api/posts', 
    { params: { page, itemsPerPage, tags } }
  );
  return data;
};

export const getPost = async (id: string) => {
  const { data } = await AXIOS.get(`/api/posts/${id}`);
  return data;
};