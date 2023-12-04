'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Input, Form, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


type FieldType = {
  email: string;
  password: string;
}


const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (error: string) => {
    api.open({
      message: 'Cannot sign in!',
      description: error,
      icon: <ExclamationCircleOutlined style={{ color: '#cf4646' }} />
    });
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);

    try {
      await signIn('credentials', { email: values.email, password: values.password, callbackUrl: '/' });
    } catch (error: any) {
      openNotification(`Cannot sign in. Error: ${error.message}`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    openNotification(`Error: ${errorInfo}`)
  };

  return (
    <Form
      name='signin'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item<FieldType> 
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Enter your email!' }]}
      >
        <Input style={{ height: '3rem' }} />
      </Form.Item>
      <Form.Item<FieldType> 
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Enter your password!' }]}
      >
        <Input.Password style={{ height: '3rem' }} />
      </Form.Item>
      <button 
        type='submit' 
        className='mx-auto w-full h-12 bg-accent-dark text-white uppercase rounded'
      >
        {isLoading ? 'Loading...' : 'Sign In'}
      </button>
      {contextHolder}
    </Form>
  );
};

export default LoginForm;