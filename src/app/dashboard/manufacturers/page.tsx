import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import ManufacturersTable from '@/components/tables/ManufacturersTable';


const Manufacturers: React.FC = async () => {
  

  return (
    <div>
      Manufacturers
      <Link href='/create-manufacturer'>New</Link>
      <ManufacturersTable />
    </div>
  );
};

export default Manufacturers;