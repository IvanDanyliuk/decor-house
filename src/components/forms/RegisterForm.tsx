'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Input, Form, notification, Col, Row } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UploadImageButton from '../ui/UploadImageBtn';
import { UploaderEndpoint } from '@/lib/common.types';
import TextField from '../ui/TextField';
import { register } from '@/lib/actions/user.actions';


type RegisterData = {
  name: string;
  phone: string;
  address?: string;
  photo?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState = {
  name: '',
  phone: '',
  address: '',
  photo: '',
  email: '',
  password: '',
  confirmPassword: '',
}


const RegisterForm: React.FC = () => {
  const [state, formAction] = useFormState(register, initialState);
  const ref = useRef<HTMLFormElement>(null);
  
  // const [photoUrl, setPhotoUrl] = useState<string>('');
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const router = useRouter();

  // const [api, contextHolder] = notification.useNotification();

  // const openNotification = (error: string) => {
  //   api.open({
  //     message: 'Cannot sign in!',
  //     description: error,
  //     icon: <ExclamationCircleOutlined style={{ color: '#cf4646' }} />
  //   });
  // };

  // const onFinish = async (values: RegisterData) => {
  //   setIsLoading(true);

  //   try {
  //       setIsLoading(true);

  //       if(values.password !== values.confirmPassword) {
  //         throw new Error('Passwords do not match!');
  //       }

  //       const response = await fetch('api/register', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           ...values,
  //           photo: photoUrl
  //         })
  //       });

  //       if(response.ok) {
  //         await signIn('credentials', { email: values.email, password: values.password, callbackUrl: '/' });
  //       }

  //       router.push('/');
  //   } catch (error: any) {
  //     setIsLoading(false);
  //     openNotification(`Cannot create a new account. Error: ${error.message}`);
  //   }
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   const errors: string[] = errorInfo.errorFields.map((error: any) => error.errors[0]);
  //   openNotification(`Something went wrong. ${errors.join(' ')}`);
  // };

  // const handleImageUrl = (imageUrl: string) => {
  //   setPhotoUrl(imageUrl);
  // };

  return (
    <form 
      ref={ref} 
      action={async formData => {
        await formAction(formData);
        ref.current?.reset()
      }}
      className='w-full flex flex-wrap gap-6'
    >
      <fieldset className='w-full md:w-auto flex flex-col gap-3 md:flex-1'>
        <TextField name='name' label='First Name and Last Name' />
        <TextField name='phone' label='Phone' />
        <TextField name='address' label='Address' />
        <TextField name='photo' type='file' label='Photo' />
        {/* <input name='photo' type='file' /> */}
      </fieldset>
      <fieldset className='w-full md:w-auto flex flex-col gap-3 md:flex-1'>
        <TextField name='email' label='Email' />
        <TextField name='password' label='Password' />
        <TextField name='confirmPassword' label='Confirm Password' />
      </fieldset>
      {/* <p>{state?.message}</p>
      <button 
        type='submit' 
        className='w-full md:w-72 h-12 bg-accent-dark text-white uppercase rounded'
      >
        Register
      </button> */}
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <button 
          type='submit' 
          className='w-full md:w-72 h-12 bg-accent-dark text-white uppercase rounded'
        >
          Register
        </button>
        <Link 
          href='/login' 
          className='w-full md:w-72 h-12 link-primary uppercase'
        >
          <span>Go back to login page</span>
        </Link>
      </div>
    </form>
    // <Form
    //   name='register'
    //   initialValues={{ remember: true }}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    //   autoComplete='off'
    // >
    //   <Row gutter={{ md: 30 }}>
    //     <Col md={12}>
    //       <Form.Item<RegisterData> 
    //         label='First Name and Last Name'
    //         name='name'
    //         rules={[{ required: true, message: 'Enter your name!' }]}
    //       >
    //         <Input />
    //       </Form.Item>
    //       <Form.Item<RegisterData> 
    //         label='Phone'
    //         name='phone'
    //         rules={[{ required: true, message: 'Enter your phone number!' }]}
    //       >
    //         <Input />
    //       </Form.Item>
    //       <Form.Item<RegisterData> 
    //         label='Address'
    //         name='address'
    //       >
    //         <Input />
    //       </Form.Item>
    //       <Form.Item<RegisterData> 
    //         label='Photo'
    //         name='photo'
    //       >
    //         <UploadImageButton  
    //           endpoint={UploaderEndpoint.ProfilePicture} 
    //           setImageUrl={handleImageUrl}
    //         />
    //       </Form.Item>
    //     </Col>
    //     <Col md={12}>
    //       <Form.Item<RegisterData> 
    //         label='Email'
    //         name='email'
    //         rules={[{ required: true, message: 'Enter your email!' }]}
    //       >
    //         <Input />
    //       </Form.Item>
    //       <Form.Item<RegisterData> 
    //         label='Password'
    //         name='password'
    //         rules={[{ required: true, message: 'Enter your password!' }]}
    //       >
    //         <Input.Password />
    //       </Form.Item>
    //       <Form.Item<RegisterData> 
    //         label='Confirm Password'
    //         name='confirmPassword'
    //         rules={[{ required: true, message: 'Confirm your password!' }]}
    //       >
    //         <Input.Password />
    //       </Form.Item>
    //     </Col>
    //   </Row>
    //   <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
    //     <button 
    //       type='submit' 
    //       className='w-full md:w-72 h-12 bg-accent-dark text-white uppercase rounded'
    //     >
    //       {isLoading ? 'Loading...' : 'Register'}
    //     </button>
    //     <Link 
    //       href='/login' 
    //       className='w-full md:w-72 h-12 link-primary uppercase'
    //     >
    //       <span>Go back to login page</span>
    //     </Link>
    //   </div>
    //   {contextHolder}
    // </Form>
  );
};

export default RegisterForm;