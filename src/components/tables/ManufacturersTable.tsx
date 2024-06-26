'use client';

import Link from 'next/link';
import { Popconfirm, Table } from 'antd';
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

  const tableData = manufacturers.map(item => ({ ...item, key: crypto.randomUUID() }));

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
      title: <Link href='/dashboard/create-manufacturer' className='dashboard-add-new-btn'>New</Link>,
      key: 'action',
      render: (_, record) => (
        <div className='flex'>
          <Link 
            className='mr-3 flex justify-center items-center text-center dashboard-table-action-btn'
            href={`/dashboard/edit-manufacturer/${record._id}`}
          >
            <EditOutlined />
          </Link>
          <Popconfirm
            title='Delete Manufacturer'
            description='Are you sure you want to delete this manufacturer?'
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

export default ManufacturersTable;