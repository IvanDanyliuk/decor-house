import React from 'react';
import { getManufacturers } from '@/lib/actions/manufacturer.actions';
import Pagination from '@/components/ui/Pagination';
import ManufacturersTable from '@/components/tables/ManufacturersTable';


const Manufacturers = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  const { data } = await getManufacturers({ page: +page, itemsPerPage: 10 });
  const parsedData = JSON.parse(JSON.stringify(data));

  return (
    <>
      {parsedData ? (
        <>
          <ManufacturersTable manufacturers={parsedData!.manufacturers} />
          <Pagination itemsCount={parsedData?.count!} />
        </>
      ) : (
        <div>Manufacturers not found</div>
      )}
    </>
  );
};

export default Manufacturers;