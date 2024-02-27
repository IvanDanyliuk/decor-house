'use client';

import { Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { deleteOrder } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/types/order.types';
import { ICartItem } from '@/lib/types/user.types';
import OrderProductsList from '../order/OrderProductList';


interface IOrdersTable {
  orders: IOrder[];
}

interface DataType {
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
}


const OrdersTable: React.FC<IOrdersTable> = ({ orders }) => {
  const confirmDeleting = async (id: string) => {
    await deleteOrder({ id, path: '/dashboard/orders' });
  };

  const tableData = orders.map(order => ({
    _id: order._id!,
    user: order.user,
    products: order.products,
    totalAmount: order.totalAmount,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    deliveryAddress: order.deliveryAddress,
    deliveryMethod: order.deliveryMethod,
    deliveryStatus: order.deliveryStatus,
    createdAt: order.createdAt!,
    key: crypto.randomUUID()
  }));

  const tableColumns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Customer',
      dataIndex: 'user',
      key: 'user',
      render: (_, record) => <span>{record.user.name}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => <span>{`${record.paymentStatus} / ${record.deliveryStatus}`}</span>
    },
    {
      title: 'Delivery Method',
      dataIndex: 'deliveryMethod',
      key: 'deliveryMethod',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => <span>{dayjs(record.createdAt).format('DD.MM.YYYY')}</span>
    },
    {
      title: 'sdfsadf',
      key: 'action',
      render: (_, record) => (
        <div className='flex gap-3'>
          <OrderProductsList data={record} />
          <Popconfirm
            title='Delete Order'
            description='Are you sure you want to delete this order?'
            onConfirm={(e) => confirmDeleting(record._id)}
            okText='Yes'
            cancelText='No'
          >
            <button 
              className='dashboard-table-action-btn'
            >
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      )
    },
  ];

  return (
    <Table 
      sticky 
      columns={tableColumns}
      dataSource={tableData}
      pagination={false}
    />
  );
};

export default OrdersTable;