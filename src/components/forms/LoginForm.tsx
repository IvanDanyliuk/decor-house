'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import TextField from '../ui/TextField';
import { useRouter } from 'next/navigation';


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

  const router = useRouter();

  const handleLoginData = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const submitLoginData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const res = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      })
    });

    setLoginData(initialLoginData);
    router.push('/');
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
        value={loginData.password} 
        onChange={handleLoginData} 
      />
      <button type='submit' className='mx-auto w-full h-12 bg-accent-dark text-white uppercase rounded'>{isLoading ? 'Loading...' : 'Sign In'}</button>
    </form>
  );
};

export default LoginForm;