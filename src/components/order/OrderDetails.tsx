'use client';

import { ICartItem, IUser } from '@/lib/types/user.types'
import React, { useEffect, useState } from 'react'


interface IOrderDetails {
  user: IUser | null;
}


const OrderDetails: React.FC<IOrderDetails> = ({ user }) => {
  const [products, setProducts] = useState<ICartItem[]>([]);

  useEffect(() => {
    if(user) {
      setProducts(user.cart);
    } else {
      const cartDataString = localStorage.getItem('cart') || '[]';
      setProducts(JSON.parse(cartDataString));
    }
  }, []);

  return (
    <div>OrderDetails</div>
  );
};

export default OrderDetails;