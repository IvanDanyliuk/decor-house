'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCartOutlined } from '@ant-design/icons';


const CartIcon: React.FC = () => {
  const [size, setSize] = useState<number>(0);

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
  }, []);

  return (
    <Link href='/cart' className='flex items-center gap-1'>
      <ShoppingCartOutlined style={{ fontSize: '20px' }} />
      <span>{`(${3})`}</span>
    </Link>
  )
}

export default CartIcon