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
    'https://decor-house.vercel.app/api/posts', 
    { params: { page, itemsPerPage, tags } }
  );
  return data;
};

export const getPost = async (id: string) => {
  const { data } = await AXIOS.get(`https://decor-house.vercel.app/api/posts/${id}`);
  return data;
};