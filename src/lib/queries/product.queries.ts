import { AXIOS } from '../axios';


export const getProducts = async ({ 
  page, 
  itemsPerPage, 
  category,
  types,
  features,
  manufacturers, 
  minPrice, 
  maxPrice,
  order,
  sortIndicator,
}: { 
  page?: number, 
  itemsPerPage?: number, 
  category?: string;
  types?: string,
  features?: string,
  manufacturers?: string;
  minPrice?: number;
  maxPrice?: number;
  order?: string;
  sortIndicator?: string;
}) => {
  const { data } = await AXIOS.get(
    '/api/products', 
    { params: { 
        page, 
        itemsPerPage, 
        category, 
        types, 
        features, 
        manufacturers, 
        minPrice, 
        maxPrice, 
        order,
        sortIndicator
    } }
  );
  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await AXIOS.get(`/api/products/${id}`);
  return data;
};

export const getProductsFilterData = async (category: string) => {
  const { data } = await AXIOS.get(
    '/api/products/filters',
    { params: { category }}
  );
  return data;
};

export const getRelatedProducts = async (email: string, limit: number) => {
  const { data } = await AXIOS.get(
    '/api/products/related',
    { params: { email, limit } }
  );
  return data;
}