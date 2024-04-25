import React from 'react';
import Pagination from '@/components/ui/Pagination';
import ManufacturersTable from '@/components/tables/ManufacturersTable';
import { getManufacturers } from '@/lib/queries/manufacturers.queries';
import { notFound } from 'next/navigation';


const Manufacturers = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = +(searchParams.page!)|| 1;
  const { data } = await getManufacturers({ page, itemsPerPage: 10 });

  if(!data) {
    notFound();
  }

  return (
    <>
      <ManufacturersTable manufacturers={data!.manufacturers} />
      <Pagination itemsCount={data?.count!} />
    </>
  );
};

export default Manufacturers;