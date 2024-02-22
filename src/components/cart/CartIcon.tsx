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
    const handleStorageChange = () => {
      const cartString = localStorage.getItem('cart');
      if(cartString) {
        const cartData = JSON.parse(cartString);
        setSize(cartData.length)
      } else {
        setSize(0);
      }
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [])

  return (
    <Link href='/cart' className='flex items-center gap-1'>
      <ShoppingCartOutlined style={{ fontSize: '20px' }} />
      <span>{size}</span>
    </Link>
  );
};

export default CartIcon;