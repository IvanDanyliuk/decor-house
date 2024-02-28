import { AXIOS } from '../axios';


export const getUsers = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  const { data } = await AXIOS.get(
    '/api/user/all', 
    { params: { page, itemsPerPage } }
  );
  return data;
};

export const getUser = async (id: string) => {
  const { data } = await AXIOS.get(
    `/api/users/${id}`,
    { params: { id } }
  );
  return data;
};

export const getCurrentUser = async (email: string) => {
  const { data } = await AXIOS.get(
    '/api/user/current',
    { params: { email } }
  );
  return data;
};

export const getProfileData = async (email: string) => {
  const { data } = await AXIOS.get(
    '/api/user/profile',
    { params: { email } }
  );
  return data;
};