import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/actions/product.actions';
import ProductsTable from '@/components/tables/ProductsTable';
import Pagination from '@/components/ui/Pagination';


const Products = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  const { data } = await getProducts({ page: +page, itemsPerPage: 10 });
  const parsedData = JSON.parse(JSON.stringify(data));

  return (
    <>
      {parsedData ? (
        <>
          <ProductsTable products={parsedData.products} />
          <Pagination itemsCount={parsedData.count} />
        </>
      ) : (
        <div>Products not found</div>
      )}
    </>
  );
};

export default Products;