import React from 'react';
import Link from 'next/link';


const Products: React.FC = () => {
  return (
    <div>
      Products
      <Link href='/create-product'>New</Link>
    </div>
  );
};

export default Products;