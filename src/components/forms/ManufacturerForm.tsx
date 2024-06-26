'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createManufacturer, updateManufacturer } from '@/lib/actions/manufacturer.actions';
import TextField from '../ui/TextField';
import SubmitButton from '../ui/SubmitButton';
import { IManufacturer } from '@/lib/types/manufacturer.types';
import { openNotification } from '../ui/Notification';
import { NotificationType } from '@/lib/common.types';


interface IManufacturerForm {
  manufacturerToUpdate?: IManufacturer;
}

const initialEmptyState = {
  name: '',
  country: '',
};


const ManufacturerForm: React.FC<IManufacturerForm> = ({ manufacturerToUpdate }) => {
  const action = manufacturerToUpdate ? updateManufacturer : createManufacturer;
  const initialState = manufacturerToUpdate ? manufacturerToUpdate : initialEmptyState;
  
  const [state, formAction] = useFormState(action, initialState);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  
  useEffect(() => {
    if(state && state.error) {
      openNotification(state.message, state.error, NotificationType.Error);
    }

    if(!state.error && state.message) {
      ref.current?.reset();
      openNotification('Done!', state.message);
      router.push('/dashboard/manufacturers');
    }
  }, [state, formAction]);

  return (
    <form 
      ref={ref} 
      action={formAction}
      className='w-full flex flex-wrap gap-3 md:gap-6'
    >
      <TextField 
        name='name' 
        label='Name' 
        defaultValue={state.name}
        error={state && state.error && state.error['name']!} 
      />
      <TextField 
        name='country' 
        label='Country' 
        defaultValue={state.country}
        error={state && state.error && state.error['country']!} 
      />
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <SubmitButton label={manufacturerToUpdate ? 'Update' : 'Create'} />
        <Link 
          href='/dashboard/manufacturers' 
          className='w-full md:w-72 h-12 link-primary uppercase'
        >
          <span>Go back to Dashboard</span>
        </Link>
      </div>
    </form>
  );
};

export default ManufacturerForm;