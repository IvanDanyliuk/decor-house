'use client'

import { deleteManufacturer } from '@/lib/actions/manufacturer.actions';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';


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
  const handleManufacturerDelete = async (id: string) => {
    await deleteManufacturer({ id, path: '/dashboard/manufacturers' });
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
            href={`/edit-manufacturer`}
          >
            <EditOutlined />
          </Link>
          <button 
            className='w-8 h-8 rounded bg-gray-light'
            onClick={() => handleManufacturerDelete(record._id)}
          >
            <DeleteOutlined />
          </button>
        </div>
      )
    },
  ];

  return (
    <Table 
      columns={tableColumns} 
      dataSource={manufacturers} 
      pagination={false} 
    />
  );
};

export default ManufacturersTable;