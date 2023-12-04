'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Input, Form, notification, Col, Row } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UploadImageButton from '../ui/UploadImageBtn';
import { UploaderEndpoint } from '@/lib/common.types';


type RegisterData = {
  name: string;
  phone: string;
  address?: string;
  photo?: string;
  email: string;
  password: string;
  confirmPassword: string;
}


const RegisterForm: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (error: string) => {
    api.open({
      message: 'Cannot sign in!',
      description: error,
      icon: <ExclamationCircleOutlined style={{ color: '#cf4646' }} />
    });
  };

  const onFinish = async (values: RegisterData) => {
    setIsLoading(true);

    try {
        setIsLoading(true);

        if(values.password !== values.confirmPassword) {
          throw new Error('Passwords do not match!');
        }

        const response = await fetch('api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...values,
            photo: photoUrl
          })
        });

        if(response.ok) {
          await signIn('credentials', { email: values.email, password: values.password, callbackUrl: '/' });
        }

        router.push('/');
    } catch (error: any) {
      openNotification(`Cannot create a new account. Error: ${error.message}`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    const errors: string[] = errorInfo.errorFields.map((error: any) => error.errors[0]);
    openNotification(`Something went wrong. ${errors.join(' ')}`);
  };

  const handleImageUrl = (imageUrl: string) => {
    setPhotoUrl(imageUrl);
  };

  return (
    <Form
      name='register'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Row gutter={{ md: 30 }}>
        <Col md={12}>
          <Form.Item<RegisterData> 
            label='First Name and Last Name'
            name='name'
            rules={[{ required: true, message: 'Enter your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<RegisterData> 
            label='Phone'
            name='phone'
            rules={[{ required: true, message: 'Enter your phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<RegisterData> 
            label='Address'
            name='address'
          >
            <Input />
          </Form.Item>
          <Form.Item<RegisterData> 
            label='Photo'
            name='photo'
          >
            <UploadImageButton  
              endpoint={UploaderEndpoint.ProfilePicture} 
              setImageUrl={handleImageUrl}
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item<RegisterData> 
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Enter your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<RegisterData> 
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Enter your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<RegisterData> 
            label='Confirm Password'
            name='confirmPassword'
            rules={[{ required: true, message: 'Confirm your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <button 
          type='submit' 
          className='w-full md:w-72 h-12 bg-accent-dark text-white uppercase rounded'
        >
          {isLoading ? 'Loading...' : 'Register'}
        </button>
        <Link 
          href='/login' 
          className='w-full md:w-72 h-12 link-primary uppercase'
        >
          <span>Go back to login page</span>
        </Link>
      </div>
      {contextHolder}
    </Form>
  );
};

export default RegisterForm;