import ShopsTable from '@/components/tables/ShopsTable';
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
          <ShopsTable shops={data.shops} />
          <Pagination itemsCount={data.count} />
        </>
      ) : (
        <div>Shops not found</div>
      )}
    </>
  );
};

export default Shops;