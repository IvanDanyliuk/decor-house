import Pagination from '@/components/ui/Pagination';
import { getShops } from '@/lib/queries/shop.queries';
import React from 'react';


const Shops = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  const { data } = await getShops({ page: +page, itemsPerPage: 10 });

  return (
    <>
      {data ? (
        <>
          {/* <CategoriesTable categories={data.categories} /> */}
          <Pagination itemsCount={data.count} />
        </>
      ) : (
        <div>Shops not found</div>
      )}
    </>
  );
};

export default Shops;