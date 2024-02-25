'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { updateCart } from '@/lib/actions/user.actions';
import { ICartItem, IUser } from '@/lib/types/user.types';
import CartItem from './CartItem';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import { Divider } from 'antd';


interface ICartDetails {
  user: IUser | null;
}


const CartDetails: React.FC<ICartDetails> = ({ user }) => {
  const [cartData, setCartData] = useState<ICartItem[]>(user?.cart || []);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { width } = useWindowSize();

  const countTotalAmount = () => {
    const amount = cartData.reduce((prev, curr) => prev + (curr.product.price * curr.quantity), 0);
    setTotalAmount(amount);
  };

  const increaseProductQuantity = async (id: string) => {
    const data = cartData.map(item => item.product._id === id ? 
      { ...item, quantity: item.quantity + 1 } : 
      item);
    setCartData(data);
    localStorage.setItem('cart', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
    if(user) {
      await updateCart(user.email, data);
    }
  };

  const decreaseProductQuantity = async (id: string) => {
    const data = cartData.map(item => item.product._id === id ? 
      { ...item, quantity: item.quantity !== 1 ? item.quantity - 1 : item.quantity } : 
      item);
    setCartData(data);
    localStorage.setItem('cart', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
    if(user) {
      await updateCart(user.email, data);
    }
  };

  const deleteProductFromCart = async (id: string) => {
    const filteredData = cartData.filter(item => item.product._id !== id);
    setCartData(filteredData);
    localStorage.setItem('cart', JSON.stringify(filteredData));
    window.dispatchEvent(new Event('storage'));
    if(user) {
      await updateCart(user.email, filteredData);
    }
  };

  useEffect(() => {
    countTotalAmount();
  }, [cartData]);

  useEffect(() => {
    if(!user) {
      const cartString = localStorage.getItem('cart') || '[]';
      setCartData(JSON.parse(cartString));
    }
  }, []);

  return (
    <div className='py-0 md:py-8 container mx-auto'>
      <ul className='w-full'>
        {cartData.map((cartItem, i) => (
          <>
            <CartItem 
              data={cartItem} 
              onIncreaseQuantity={increaseProductQuantity} 
              onDecreaseQuantity={decreaseProductQuantity} 
              onDeleteItem={deleteProductFromCart} 
            />
            <Divider />
          </>
        ))}
      </ul>
      {width && width < 640 && (
        <p className='py-6 text-3xl text-right font-bold'>
          Total: <span>&euro;{totalAmount}</span>
        </p>
      )}
      <div className='py-6 flex justify-between items-center gap-3'>
        <Link href='/catalog' className='cart-btn'>
          {width && width >= 640 && (
            <Image 
              src='/assets/icons/left-arrow.svg'
              alt='arrow-left'
              width={30}
              height={30}
            />
          )}
          <span>Continue shopping</span>
        </Link>
        <div className='flex flex-1 md:flex-none items-center gap-8'>
          {width && width >= 640 && (
            <p className='text-xl font-bold'>
              Total: <span>&euro;{totalAmount}</span>
            </p>
          )}
          <Link href='/checkout' className='cart-btn bg-accent-dark text-white'>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;