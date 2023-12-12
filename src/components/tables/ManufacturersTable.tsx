'use client'

import Link from 'next/link';
import { Popconfirm, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteManufacturer } from '@/lib/actions/manufacturer.actions';


interface IManufacturer {
  _id: string;
  name: string;
  country: string;
}

interface IManufacturersTable {
  manufacturers: IManufacturer[];
}

interface DataType {
  _id: string;
  name: string;
  country: string;
}


const ManufacturersTable: React.FC<IManufacturersTable> = ({ manufacturers }) => {
  const confirmDeleting = async (id: string) => {
    await deleteManufacturer({ id, path: '/dashboard/manufacturers' });
  };
  
  const cancelDeleting = (e: React.MouseEvent<HTMLElement> | undefined) => {
    console.log(e)
    message.error('Click on No');
  };

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
      title: 'Country',
      dataIndex: 'country',
      key: 'country'
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <div className='flex'>
          <Link 
            className='mr-3 w-8 h-8 flex justify-center items-center text-center rounded bg-gray-light'
            href={`/edit-manufacturer/${record._id}`}
          >
            <EditOutlined />
          </Link>
          <Popconfirm
            title='Delete Manufacturer'
            description='Are you sure you want to delete this manufacturer?'
            onConfirm={(e) => confirmDeleting(record._id)}
            onCancel={cancelDeleting}
            okText='Yes'
            cancelText='No'
          >
            <button 
              className='w-8 h-8 rounded bg-gray-light'
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
      dataSource={manufacturers} 
      pagination={false} 
    />
  );
};

export default ManufacturersTable;