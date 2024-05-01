'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { login } from '@/lib/actions/auth';
import TextField from '../ui/TextField';
import SubmitButton from '../ui/SubmitButton';


const LoginForm: React.FC = () => {
  const [state, formAction] = useFormState(login, undefined);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    localStorage.setItem('cart', '[]');

    if(state && !state.error) {
      ref.current?.reset();
    }
  }, [state, formAction]);

  return (
    <form action={formAction} className='flex flex-col items-center gap-3'>
      <TextField 
        name='email' 
        label='Email' 
        error={state && state.error && state.error['email']!}
      />
      <TextField 
        name='password' 
        label='Password' 
        type='password' 
        error={state && state.error && state.error['password']!}
      />
      <SubmitButton label='Sign In' />
    </form>
  );
};

export default LoginForm;