'use client';

import Link from 'next/link';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';


interface ICartIcon {
  cartSize: number;
}

const CartIcon: React.FC<ICartIcon> = ({ cartSize }) => {
  const [size, setSize] = useState<number>(cartSize || 0);

  useEffect(() => {
    
  }, [])

  return (
    <Link href='/cart' className='flex items-center gap-1'>
      <ShoppingCartOutlined style={{ fontSize: '20px' }} />
      <span>{`(${3})`}</span>
    </Link>
  );
};

export default CartIcon;