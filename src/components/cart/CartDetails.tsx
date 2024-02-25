'use client';

import { updateCart } from '@/lib/actions/user.actions';
import { ICartItem, IUser } from '@/lib/types/user.types';
import { DeleteOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ICartDetails {
  user: IUser | null;
}


const CartDetails: React.FC<ICartDetails> = ({ user }) => {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState<ICartItem[]>(user?.cart || []);
  const [totalAmount, setTotalAmount] = useState<number>(0);

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

  const deleteProductFromCart = (id: string) => {
    const filteredData = cartData.filter(item => item.product._id !== id);
    setCartData(filteredData);
    localStorage.setItem('cart', JSON.stringify(filteredData));
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    if(!user) {
      const cartString = localStorage.getItem('cart') || '[]';
      setCartData(JSON.parse(cartString));
    }
  }, []);

  return (
    <div className='container mx-auto'>
      <ul>
        {cartData.map(cartItem => (
          <li key={crypto.randomUUID()} className='flex items-center gap-6'>
            <Image src={cartItem.product.images[0]} alt={cartItem.product.name} width={150} height={150} />
            <p className='flex-1'>{cartItem.product.name}</p>
            <p className='flex-1'>
              &euro;<span>{cartItem.product.price}</span>
            </p>
            <div className='flex gap-3'>
              <button type='button' onClick={() => decreaseProductQuantity(cartItem.product._id!)}>-</button>
              <p>{cartItem.quantity}</p>
              <button type='button' onClick={() => increaseProductQuantity(cartItem.product._id!)}>+</button>
            </div>
            <p>
              &euro;<span>{cartItem.product.price * cartItem.quantity}</span>
            </p>
            <button type='button' onClick={() => deleteProductFromCart(cartItem.product._id!)}>
              <DeleteOutlined />
            </button>
          </li>
        ))}
      </ul>
      <div className='flex justify-between items-center'>
          <Link href='/catalog' className='cart-btn'>
            <Image 
              src='/assets/icons/left-arrow.svg'
              alt='arrow-left'
              width={30}
              height={30}
            />
            <span>Continue shopping</span>
          </Link>
          <div className='flex items-center gap-6'>
            <p className='text-xl font-bold'>
              Total: <span>&euro;{totalAmount}</span>
            </p>
            <Link href='/checkout' className='cart-btn bg-accent-dark text-white'>
              Checkout
            </Link>
          </div>
        </div>
    </div>
  );
};

export default CartDetails;