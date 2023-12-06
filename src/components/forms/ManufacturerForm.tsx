'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Form, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


type FieldType = {
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
      // await fetch('api/manufacturers', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // });

      console.log('CREATE MANUFACTURER', values)
    } catch (error: any) {
      openNotification(`Error: ${error.message}`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    openNotification(`Error: ${errorInfo}`)
  };

  
  return (
    <Form
      name='create-manufacturer'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item<FieldType>
        label='Name'
        name='name'
        rules={[{ required: true, message: 'Name is required!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label='Country'
        name='country'
        rules={[{ required: true, message: 'Country is required!' }]}
      >
        <Input />
      </Form.Item>
      <button
        type='submit' 
        className='mx-auto w-full h-12 bg-accent-dark text-white uppercase rounded'
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </Form>
  );
};

export default ManufacturerForm;