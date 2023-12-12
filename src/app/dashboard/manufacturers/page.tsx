import React from 'react';
import Link from 'next/link';
import { getManufacturers } from '@/lib/actions/manufacturer.actions';
import Pagination from '@/components/ui/Pagination';
import ManufacturersTable from '@/components/tables/ManufacturersTable';


interface IManufacturer {
  _id: string;
  name: string;
  country: string;
}

interface IManufacturersData {
  manufacturers: IManufacturer[];
}


const Manufacturers = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const page = searchParams.page || 1;

  const manufacturers = await getManufacturers({ page: +page, itemsPerPage: 10 });

  return (
    <div>
      Manufacturers
      <Link href='/create-manufacturer'>New</Link>
      {manufacturers.data ? (
        <ManufacturersTable manufacturers={manufacturers.data!.manufacturers} />
      ) : (
        <div>Manufacturers not found</div>
      )}
      <Pagination itemsCount={manufacturers.data?.count!} />
    </div>
  );
};

export default Manufacturers;