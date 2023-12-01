'use client';

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import TextField from '../ui/TextField';
import UploadImageButton from '../ui/UploadImageBtn';
import { UploaderEndpoint } from '@/lib/common.types';
import { isEmailValid } from '@/utils/helpers';


interface RegisterData {
  name: string;
  phone: string;
  address?: string;
  photo?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialRegisterData = {
  name: '',
  phone: '',
  address: '',
  photo: '',
  email: '',
  password: '',
  confirmPassword: '',
};


const RegisterForm: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterData>(initialRegisterData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const handleRegisterData = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUrl = (imageUrl: string) => {
    setRegisterData((prevState) => ({
      ...prevState,
      photo: imageUrl
    }));
  };

  const submitRegisterData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if(!isEmailValid(registerData.email)) {
      setError('Email is not valid!');
      return;
    }

    if(registerData.password && registerData.password.length < PASSWORD_MIN_LENGTH) {
      setError(`Your password should contain ${PASSWORD_MIN_LENGTH} or more symbols!`);
      return;
    }

    if(registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    try {
      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: registerData.name,
          phone: registerData.phone,
          address: registerData.address,
          photo: registerData.photo,
          email: registerData.email,
          password: registerData.password,
        })
      });

      console.log(res)
    } catch (error: any) {
      setError(`Registration Error: ${error.message}`);
      return;
    }

    setRegisterData(initialRegisterData);
    router.push('/');
  };

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [sessionStatus, router]);

  return (
    <form onSubmit={submitRegisterData} className='relative w-full flex flex-wrap justify-start md:gap-20'>
      <fieldset className='flex flex-col flex-1 gap-6'>
        <TextField 
          label='First Name and Last Name *' 
          name='name' 
          value={registerData.name} 
          onChange={handleRegisterData} 
        />
        <TextField 
          label='Phone *' 
          name='phone' 
          value={registerData.phone} 
          onChange={handleRegisterData} 
        />
        <TextField 
          label='Address' 
          name='address' 
          value={registerData.address || ''} 
          onChange={handleRegisterData} 
        />
        <UploadImageButton 
          label='Profile Photo' 
          endpoint={UploaderEndpoint.ProfilePicture} 
          setImageUrl={handleImageUrl}
        />
      </fieldset>
      <fieldset className='flex flex-col flex-1 gap-6'>
        <TextField 
          label='Email *' 
          name='email' 
          type='email'
          value={registerData.email} 
          onChange={handleRegisterData} 
        />
        <TextField 
          label='Password *' 
          name='password' 
          type='password'
          value={registerData.password} 
          onChange={handleRegisterData} 
        />
        <TextField 
          label='Confirm Password *' 
          name='confirmPassword' 
          type='password'
          value={registerData.confirmPassword} 
          onChange={handleRegisterData} 
        />
      </fieldset>
      <fieldset className='w-full'>
        <button type='submit' className='w-72 h-12 bg-accent-dark text-white uppercase rounded'>{isLoading ? 'Loading...' : 'Register'}</button>
      </fieldset>
    </form>
  );
};

export default RegisterForm;