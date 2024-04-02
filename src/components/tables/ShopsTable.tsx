'use client';

import Link from 'next/link';
import { Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteShop } from '@/lib/actions/shop.actions';
import { IShop } from '@/lib/types/shop.types';


interface IShopsTable {
  shops: IShop[];
}

interface DataType {
  _id?: string;
  name: string;
  address: string;
}


const ShopsTable: React.FC<IShopsTable> = ({ shops }) => {
  const confirmDeleting = async (id: string) => {
    await deleteShop({ id, path: '/dashboard/shops' });
  };

  const tableData = shops.map(shop => ({ ...shop, key: crypto.randomUUID() }));

  const tableColumns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: <Link href='/dashboard/create-shop' className='dashboard-add-new-btn'>New</Link>,
      key: 'action',
      render: (_, record) => (
        <div className='flex'>
          <Link 
            className='mr-3 flex justify-center items-center text-center dashboard-table-action-btn'
            href={`/dashboard/edit-shop/${record._id!}`}
          >
            <EditOutlined />
          </Link>
          <Popconfirm
            title='Delete Shop'
            description='Are you sure you want to delete this shop?'
            onConfirm={(e) => confirmDeleting(record._id!)}
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
    <div className='overflow-x-auto'>
      <Table 
        sticky
        columns={tableColumns} 
        dataSource={tableData} 
        pagination={false} 
        style={{ minWidth: '1000px' }}
        scroll={{ x: '1000px' }}
      />
    </div>
  );
};

export default ShopsTable;