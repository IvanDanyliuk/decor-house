'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import TextField from '../ui/TextField';
import { isEmailValid } from '@/utils/helpers';


interface LoginData {
  email: string;
  password: string;
}

const initialLoginData = {
  email: '',
  password: '',
};


const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>(initialLoginData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginData = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const submitLoginData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if(!isEmailValid(loginData.email)) {
      setError('Email is not valid');
      return;
    }

    if(!loginData.password && loginData.password.length < PASSWORD_MIN_LENGTH) {
      setError('Password is not valid!');
    }

    await signIn('credentials', { email: loginData.email, password: loginData.password, callbackUrl: '/' });

    setLoginData(initialLoginData);
  };

  return (
    <form onSubmit={submitLoginData} className='relative mx-auto max-w-md flex flex-wrap justify-start md:gap-6'>
      <TextField 
        label='Email' 
        name='email' 
        value={loginData.email} 
        onChange={handleLoginData} 
      />
      <TextField 
        label='Password' 
        name='password' 
        type='password'
        value={loginData.password} 
        onChange={handleLoginData} 
      />
      <button type='submit' className='mx-auto w-full h-12 bg-accent-dark text-white uppercase rounded'>{isLoading ? 'Loading...' : 'Sign In'}</button>
    </form>
  );
};

export default LoginForm;