'use client';

import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/actions/order.actions';
import { DeliveryMethod, DeliveryStatus, PaymentMethod, PaymentStatus } from '@/lib/types/order.types';
import { ICartItem, IUser } from '@/lib/types/user.types'
import TextField from '../ui/TextField';
import Select from '../ui/Select';
import TextareaField from '../ui/TextareaField';
import Radio from '../ui/Radio';
import SubmitButton from '../ui/SubmitButton';
import { updateCart } from '@/lib/actions/user.actions';


interface IOrderDetails {
  user: IUser | null;
}

const initialState = {
  name: '',
  phone: '',
  email: '',
  comment: '',
  deliveryAddress: '',
  paymentMethod: '',
};


const OrderDetails: React.FC<IOrderDetails> = ({ user }) => {
  const [products, setProducts] = useState<ICartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isPersonalDataSubmitted, setIsPersonalDataSubmitted] = useState<boolean>(false);

  const [state, formAction] = useFormState(createOrder.bind(null, {
    products: JSON.stringify(products),
    totalAmount: totalAmount.toString(),
    deliveryStatus: DeliveryStatus.NotDelivered,
    paymentStatus: PaymentStatus.NotPaid
  }), initialState);

  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const paymentMethodOptions = [
    { label: 'VISA/MasterCard', value: PaymentMethod.Card },
    { label: 'Cash', value: PaymentMethod.Cash }
  ];

  const deliveryMethodOptions = [
    { label: 'Delivery', value: DeliveryMethod.Delivery },
    { label: 'Pickup', value: DeliveryMethod.Pickup }
  ];

  const submitPersonalData = () => {
    setIsPersonalDataSubmitted(prev => !prev);
  };

  useEffect(() => {
    if(user) {
      setProducts(user.cart);
      setTotalAmount(user.cart.reduce((prev, curr) => prev + curr.product.price * curr.quantity, 0));
    } else {
      const cartDataString = localStorage.getItem('cart') || '[]';
      const cartData = JSON.parse(cartDataString);
      setProducts(cartData);
      setTotalAmount(cartData.reduce((prev: number, curr: ICartItem) => prev + curr.product.price * curr.quantity, 0));
    }
  }, []);

  useEffect(() => {
    if(!state.error && state.message) {
      ref.current?.reset();
      if(user) {
        updateCart(user.email, []);
      }
      localStorage.setItem('cart', '[]');
      window.dispatchEvent(new Event('storage'));
      setProducts([]);
      setTotalAmount(0);
      router.push('/catalog');
    }
  }, [state, formAction]);

  return (
    <div className='py-6'>
      <form 
        action={formAction}
        className='flex gap-10'
      >
        <fieldset className='flex flex-col flex-1 gap-6'>
          <legend className='mb-6 text-xl font-semibold uppercase'>General Information</legend>
          <TextField 
            name='name' 
            label='First Name and Last Name*' 
            defaultValue={user ? user.name : ''}
            error={state && state.error && state.error['name']!} 
          />
          <TextField 
            name='phone' 
            label='Phone*' 
            defaultValue={user ? user.phone : ''}
            error={state && state.error && state.error['phone']!} 
          />
          <TextField 
            name='email' 
            label='Email*' 
            defaultValue={user ? user.email : ''}
            error={state && state.error && state.error['email']!} 
          />
          <TextareaField 
            name='comment' 
            label='Comment to Order' 
            error={state && state.error && state.error['comment']!} 
          />
        </fieldset>
        <fieldset className='flex flex-col flex-1 justify-between gap-10'>
          <div className='flex flex-col gap-6'>
            <legend className='text-xl font-semibold uppercase'>Delivery & Payment</legend>
            <Radio 
              name='deliveryMethod' 
              options={deliveryMethodOptions} 
              error={state && state.error && state.error['deliveryMethod']!} 
            />
            <Select 
              name='paymentMethod' 
              label='Payment Method' 
              options={paymentMethodOptions} 
              defaultValue={paymentMethodOptions[0].value}
              error={state && state.error && state.error['paymentMethod']!} 
            />
            <TextField 
              name='deliveryAddress' 
              label='Delivery Address*' 
              defaultValue={user ? user.address : ''}
              error={state && state.error && state.error['deliveryAddress']!} 
            />
          </div>
          <div>
            <div className='text-2xl font-bold'>
              Total:
              <span>&euro;{totalAmount}</span>
            </div>
            <div className='mt-6 mb-16 flex gap-3'>
              <input 
                type='checkbox' 
                onChange={submitPersonalData} 
                checked={isPersonalDataSubmitted} 
              />
              <p className='max-w-sm text-sm text-gray-dark'>
                I accept the terms of operation of the site and give 
                voluntary consent to the processing my personal data
              </p>
            </div>
            <SubmitButton label='Checkout' disabled={!isPersonalDataSubmitted} />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default OrderDetails;