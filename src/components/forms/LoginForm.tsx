'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TextField from '../ui/TextField';
import { isEmailValid } from '@/utils/helpers';


interface ILoginData {
  email: string;
  password: string;
}

const initialLoginData: ILoginData = {
  email: '',
  password: '',
};


const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<ILoginData>(initialLoginData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (error: string) => {
    api.open({
      message: 'Cannot sign in!',
      description: error,
      icon: <ExclamationCircleOutlined style={{ color: '#cf4646' }} />
    });
  };

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
      openNotification('Email is not valid');
      return;
    }

    if(!loginData.password && loginData.password.length < PASSWORD_MIN_LENGTH) {
      openNotification('Password is not valid!');
      return;
    }

    try {
      await signIn('credentials', { email: loginData.email, password: loginData.password, callbackUrl: '/' });
    } catch (error: any) {
      openNotification(`Cannot sign in. Error: ${error.message}`);
    }

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
      {contextHolder}
      <button type='submit' className='mx-auto w-full h-12 bg-accent-dark text-white uppercase rounded'>
        {isLoading ? 'Loading...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;