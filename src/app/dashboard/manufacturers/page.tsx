import React from 'react';
import Link from 'next/link';


const Manufacturers: React.FC = () => {
  return (
    <div>
      Manufacturers
      <Link href='/create-manufacturer'>New</Link>
    </div>
  );
};

export default Manufacturers;