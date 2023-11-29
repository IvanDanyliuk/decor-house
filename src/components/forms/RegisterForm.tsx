'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '../ui/TextField';
import UploadImageButton from '../ui/UploadImageBtn';
import { UploaderEndpoint } from '@/lib/common.types';


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

//<<<<<<<<<<<<<<<<<TEMPORARY>>>>>>>>>>>>>>>>>>>>
const sendData = (registerData: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(registerData);
      //@ts-ignore
      resolve();
    }, 3000);
  });
}


const RegisterForm: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterData>(initialRegisterData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

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
    await sendData(registerData);
    router.push('/');
  };

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