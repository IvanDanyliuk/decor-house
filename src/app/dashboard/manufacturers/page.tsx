import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import ManufacturersTable from '@/components/tables/ManufacturersTable';
import { getManufacturers } from '@/lib/actions/manufacturer.actions';


const Manufacturers: React.FC = async () => {
  const manufacturers = await getManufacturers();
  return (
    <div>
      Manufacturers
      <Link href='/create-manufacturer'>New</Link>
      {manufacturers.data ? (
        <ManufacturersTable manufacturers={manufacturers.data} />
      ) : (
        <div>Manufacturers not found</div>
      )}
    </div>
  );
};

export default Manufacturers;