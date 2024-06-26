'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import TextField from '../ui/TextField';
import { register } from '@/lib/actions/user.actions';
import SubmitButton from '../ui/SubmitButton';
import UploadImageButton from '../ui/UploadImageBtn';
import { openNotification } from '../ui/Notification';
import { NotificationType } from '@/lib/common.types';


const initialState = {
  name: '',
  phone: '',
  address: '',
  photo: '',
  email: '',
  password: '',
  confirmPassword: '',
};


const RegisterForm: React.FC = () => {
  const [state, formAction] = useFormState(register, initialState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if(state && state.error) {
      openNotification(state.message, state.error, NotificationType.Error);
    }

    if(state && !state.error && state.data && state.data.email && state.data.password) {
      signIn('credentials', {
        email: state.data.email,
        password: state.data.password,
        callbackUrl: '/'
      }).then(res => openNotification('Welcome!', 'You have been successfully signed up!'));
    }
  }, [state, formAction]);

  return (
    <form 
      ref={ref} 
      action={formAction}
      className='w-full flex flex-wrap gap-6'
    >
      <fieldset className='w-full md:w-auto flex flex-col gap-3 md:flex-1'>
        <TextField 
          name='name' 
          label='First Name and Last Name' 
          error={state && state.error && state.error['name']!} 
        />
        <TextField 
          name='phone' 
          label='Phone' 
          error={state && state.error && state.error['phone']!} 
        />
        <TextField 
          name='address' 
          label='Address' 
          error={state && state.error && state.error['address']!} 
        />
        <UploadImageButton 
          name='photo' 
          label='Photo' 
        />
      </fieldset>
      <fieldset className='w-full md:w-auto flex flex-col gap-3 md:flex-1'>
        <TextField 
          name='email' 
          label='Email' 
          error={state && state.error && state.error['email']!} 
        />
        <TextField 
          name='password' 
          label='Password' 
          error={state && state.error && state.error['password']!} 
        />
        <TextField 
          name='confirmPassword' 
          label='Confirm Password' 
          error={state && state.error && state.error['confirmPassword']!} 
        />
      </fieldset>
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <SubmitButton label='Register' />
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

export default RegisterForm;