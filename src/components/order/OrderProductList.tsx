'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Divider, Modal } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { ICartItem } from '@/lib/types/user.types';
import { useWindowSize } from '@/utils/hooks/use-window-size';


interface IOrderProducts {
  data: {
    _id: string;
    user: {
      name: string;
      phone: string;
      email: string;
    };
    products: ICartItem[];
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    deliveryAddress: string;
    deliveryMethod: string;
    deliveryStatus: string;
    createdAt: string;
  };
}


const OrderProductList: React.FC<IOrderProducts> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { width } = useWindowSize();

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        type='button'
        onClick={handleModalOpen} 
        className='flex items-center gap-1 dashboard-table-action-btn'
      >
        <OrderedListOutlined />
        <span>Details</span>
      </button>
      <Modal
        title={`Order #${data._id} dated ${dayjs(data.createdAt).format('DD.MM.YYYY')}`}
        open={isOpen}
        onCancel={handleModalOpen}
        footer={null}
        width={width && width >= 640 ? 780 : '90%'}
      >
        <Divider />
        <table className='w-full'>
          <tr>
            <th className='px-3 py-2 text-left'></th>
            <th className='px-3 py-2 text-left'>Product Name</th>
            <th className='px-3 py-2 text-left'>Type</th>
            <th className='px-3 py-2 text-left'>Price</th>
            <th className='px-3 py-2 text-left'>Quantity</th>
            <th className='px-3 py-2 text-left'>Amount</th>
          </tr>
          {data.products.map(item => (
            <tr key={crypto.randomUUID()} className='font-semibold'>
              <td className='px-3 py-2'>
                <Image src={item.product.images[0]} alt={item.product.name} width={100} height={100} />
              </td>
              <td className='px-3 py-2'>{item.product.name}</td>
              <td className='px-3 py-2'>{item.product.type}</td>
              <td className='px-3 py-2 text-center'>{item.product.price}</td>
              <td className='px-3 py-2 text-center'>{item.quantity}</td>
              <td className='px-3 py-2 text-center'>{item.product.price * item.quantity}</td>
            </tr>
          ))}
        </table>
        <Divider />
        <div className='flex justify-between items-start gap-10'>
          <div>
            <div className='flex gap-1'>
              <span>Customer:</span>
              <span>{data.user.name}:</span>
            </div>
            <div className='flex gap-1'>
              <span>Phone:</span>
              <span>{data.user.phone}:</span>
            </div>
            <div className='flex gap-1'>
              <span>Email:</span>
              <span>{data.user.email}:</span>
            </div>
            <div className='flex gap-1'>
              <span>Address:</span>
              <span>{data.deliveryAddress}</span>
            </div>
          </div>
          <p className='text-xl font-bold'>
            <span className='mr-3'>Total Amount:</span>
            <span className='text-3xl'>&euro;{data.totalAmount}</span>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default OrderProductList;