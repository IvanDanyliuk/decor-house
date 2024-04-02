'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteInterior } from '@/lib/actions/interior.actions';
import { IInterior } from '@/lib/types/interior.types';


interface IInteriorsTable {
  interiors: IInterior[];
}

interface DataType {
  _id?: string;
  title: string;
  image: string;
  products: any;
}

const InteriorsTable: React.FC<IInteriorsTable> = ({ interiors }) => {
  const confirmDeleting = async (id: string) => {
    await deleteInterior({ id, path: '/dashboard/interiors' });
  };

  const tableData = interiors.map(item => ({
    ...item,
    products: `${item.products.length} product${item.products.length > 1 || item.products.length === 0 ? 's' : ''}`,
    key: crypto.randomUUID(),
  }));

  const tableColumns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <Image src={record.image} alt={record._id!} width={50} height={50} />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
    },
    {
      title: <Link href='/dashboard/create-interior' className='dashboard-add-new-btn'>New</Link>,
      key: 'action',
      render: (_, record) => (
        <div className='flex'>
          <Link 
            className='mr-3 flex justify-center items-center text-center dashboard-table-action-btn'
            href={`/dashboard/edit-interior/${record._id}`}
          >
            <EditOutlined />
          </Link>
          <Popconfirm
            title='Delete Interior'
            description='Are you sure you want to delete this interior?'
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
      ),
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

export default InteriorsTable;