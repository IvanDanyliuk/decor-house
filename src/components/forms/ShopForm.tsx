'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { createShop, updateShop } from '@/lib/actions/shop.actions';
import { IShop } from '@/lib/types/shop.types';
import TextField from '../ui/TextField';
import SubmitButton from '../ui/SubmitButton';

const MapInput = dynamic(() => import('../ui/MapInput'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});


interface IShopForm {
  shopToUpdate?: IShop;
}

const initialEmptyState = {
  name: '',
  city: '',
  country: '',
  address: '',
  coordinates: '',
}


const ShopForm: React.FC<IShopForm> = async ({ shopToUpdate }) => {
  const action = shopToUpdate ? updateShop : createShop;
  const initialState = shopToUpdate || initialEmptyState;

  const [state, formAction] = useFormState(action, initialState);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if(!state.error && state.message) {
      ref.current?.reset();
      router.push('/dashboard/shops');
    }
  }, [state, formAction]);

  return (
    <form 
      ref={ref} 
      action={formAction}
      className='w-full flex flex-wrap gap-6'
    >
      <TextField 
        name='name' 
        label='Name' 
        defaultValue={shopToUpdate?.name} 
        error={state && state.error && state.error['name']} 
      />
      <TextField 
        name='city' 
        label='City' 
        defaultValue={shopToUpdate?.city} 
        error={state && state.error && state.error['city']} 
      />
      <TextField 
        name='country' 
        label='Country' 
        defaultValue={shopToUpdate?.country} 
        error={state && state.error && state.error['country']} 
      />
      <TextField 
        name='address' 
        label='Address' 
        defaultValue={shopToUpdate?.address} 
        error={state && state.error && state.error['address']} 
      />
      <MapInput 
        name='coordinates' 
        label='Coordinates' 
        defaultValue={shopToUpdate?.coordinates && ({ lat: +shopToUpdate?.coordinates.lat!, lng: +shopToUpdate?.coordinates.lng! })}
        error={state && state.error && state.error['coordinates']} 
      />
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <SubmitButton label={shopToUpdate ? 'Update' : 'Create'} />
        <Link 
          href='/dashboard/shops' 
          className='w-full md:w-72 h-12 link-primary uppercase'
        >
          <span>Go back to Dashboard</span>
        </Link>
      </div>
    </form>
  );
};

export default ShopForm;