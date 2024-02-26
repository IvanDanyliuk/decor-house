'use client';

import { Popconfirm } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { deleteOrder } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/types/order.types';
import { ICartItem } from '@/lib/types/user.types';


interface IOrdersTable {
  orders: IOrder[];
}

interface DataType {
  _id: string;
  user: string;
  products: ICartItem[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  deliveryMethod: string;
  deliveryStatus: string;
  createdAt: string;
}


const OrdersTable: React.FC<IOrdersTable> = ({ orders }) => {
  const confirmDeleting = async (id: string) => {
    await deleteOrder({ id, path: '/dashboard/orders' });
  };

  const tableData = orders.map(order => ({ ...order, user: order.user.name }));

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
      key: 'paymentStatus',
      render: (_, record) => <span>{`${record.paymentStatus} / ${record.deliveryStatus}`}</span>
    },
    {
      title: 'Delivery Method',
      dataIndex: 'deliveryMethod',
      key: 'deliveryMethod',
    },
    {
      title: 'Delivery Status',
      dataIndex: 'deliveryStatus',
      key: 'deliveryStatus',
    },
    {
      title: '',
      key: 'products',
      render: () => <button>Details</button>
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => <span>{dayjs(record.createdAt).format('DD.MM.YYYY')}</span>
    },
    {
      title: '',
      key: 'details',
      render: (_, record) => (
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