'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { createManufacturer } from '@/lib/actions/manufacturer.actions';
import TextField from '../ui/TextField';
import SubmitButton from '../ui/SubmitButtom';


const initialState = {
  name: '',
  country: '',
};


const ManufacturerForm: React.FC = () => {
  const [state, formAction] = useFormState(createManufacturer, initialState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if(state && !state.error) {
      ref.current?.reset();
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
        error={state && state.error && state.error['name']!} 
      />
      <TextField 
        name='country' 
        label='Country' 
        error={state && state.error && state.error['country']!} 
      />
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <SubmitButton label='Create' />
        <Link 
          href='/login' 
          className='w-full md:w-72 h-12 link-primary uppercase'
        >
          <span>Go back to login page</span>
        </Link>
      </div>
    </form>
  );
};

export default ManufacturerForm;