'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { IUser } from '@/lib/types/user.types';


interface ICartIcon {
  user: IUser | null;
}


const CartIcon: React.FC<ICartIcon> = ({ user }) => {
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
    };

    if(user) {
      const cartString = localStorage.getItem('cart');
      if(!cartString) {
        localStorage.setItem('cart', JSON.stringify(user.cart));
      }
      
      localStorage.setItem('viewed', JSON.stringify(user.viewed));
      setSize(user.cart.length);
    } else {
      handleStorageChange();
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Link href='/cart' className='flex items-center gap-1'>
      <ShoppingCartOutlined style={{ fontSize: '20px' }} />
      <span>{size}</span>
    </Link>
  )
}

export default CartIcon