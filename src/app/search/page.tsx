import { getCategories } from '@/lib/queries/category.queries';
import { getManufacturers } from '@/lib/queries/manufacturers.queries';
import { getProductsFilterData } from '@/lib/queries/product.queries';
import React from 'react'

const Search = async ({ params, searchParams }: any) => {
  // const categories = await getCategories({});
  // const manufacturers = await getManufacturers({});
  

  return (
    <div>Search</div>
  );
};

export default Search;