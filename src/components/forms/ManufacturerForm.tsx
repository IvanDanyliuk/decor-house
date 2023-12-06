'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Form, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


type ManufacturerType = {
  name: string;
  country: string;
}


const ManufacturerForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (error: string) => {
    api.open({
      message: 'Cannot create a new manufacturer!',
      description: error,
      icon: <ExclamationCircleOutlined style={{ color: '#cf4646' }} />
    });
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);

    try {
      await fetch('api/manufacturers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      router.push('/dashboard/manufacturers');
    } catch (error: any) {
      setIsLoading(false);
      openNotification(`Error: ${error.message}`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    const errors: string[] = errorInfo.errorFields.map((error: any) => error.errors[0]);
    openNotification(`Error: ${errors}`)
  };

  return (
    <Form
      name='createManufacturer'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item<ManufacturerType>
        label='Name'
        name='name'
        rules={[{ required: true, message: 'Name is required!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<ManufacturerType>
        label='Country'
        name='country'
        rules={[{ required: true, message: 'Country is required!' }]}
      >
        <Input />
      </Form.Item>
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <button
          type='submit' 
          className='w-full md:w-72 h-12 bg-accent-dark text-white uppercase rounded'
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <Link 
          href='/dashboard/manufacturers' 
          className='w-full md:w-72 h-12 link-primary uppercase'
        >
          <span>Go back to Dashboard</span>
        </Link>
      </div>
      {contextHolder}
    </Form>
  );
};

export default ManufacturerForm;