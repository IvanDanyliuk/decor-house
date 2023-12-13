import React from 'react';
import Link from 'next/link';
import { getManufacturers } from '@/lib/actions/manufacturer.actions';
import Pagination from '@/components/ui/Pagination';
import ManufacturersTable from '@/components/tables/ManufacturersTable';


const Manufacturers = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const page = searchParams.page || 1;

  const { data } = await getManufacturers({ page: +page, itemsPerPage: 10 });
  const parsedData = JSON.parse(JSON.stringify(data));

  return (
    <div>
      Manufacturers
      <Link href='/create-manufacturer'>New</Link>
      {parsedData ? (
        <ManufacturersTable manufacturers={parsedData!.manufacturers} />
      ) : (
        <div>Manufacturers not found</div>
      )}
      <Pagination itemsCount={parsedData?.count!} />
    </div>
  );
};

export default Manufacturers;