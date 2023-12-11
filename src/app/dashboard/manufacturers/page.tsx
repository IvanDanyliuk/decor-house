import React from 'react';
import Link from 'next/link';
import { getManufacturers } from '@/lib/actions/manufacturer.actions';
import Pagination from '@/components/ui/Pagination';



const Manufacturers = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  

  const page = searchParams.page || 1;
  // const itemsPerPage = typeof searchParams.itemsPerPage === 'string' ? Number(searchParams.itemsPerPage) : 10;

  const manufacturers = await getManufacturers({ page: +page, itemsPerPage: 10 });
  console.log('Manufacturers', manufacturers.data)

  return (
    <div>
      Manufacturers
      <Link href='/create-manufacturer'>New</Link>
      {manufacturers.data ? (
        <ul>
          {manufacturers.data.manufacturers.map(item => (
            <li key={crypto.randomUUID()}>{`${item.name} ${item.country}`}</li>
          ))}
        </ul>
      ) : (
        <div>Manufacturers not found</div>
      )}
      <Pagination itemsCount={manufacturers.data?.count!} />
    </div>
  );
};

export default Manufacturers;