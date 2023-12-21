'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ICategory } from '@/lib/types/category.types';
import { deleteCategory } from '@/lib/actions/category.actions';


interface ICategoryTableItem extends ICategory {
  _id: string;
}

interface ICategoriesTable {
  categories: ICategoryTableItem[];
}

interface DataType {
  _id: string;
  name: string;
  image: string;
  types: string;
  features: string;
}


const CategoriesTable: React.FC<ICategoriesTable> = ({ categories }) => {
  const confirmDeleting = async (id: string) => {
    await deleteCategory({ id, path: '/dashboard/categories' });
  };

  const tableData = categories.map(item => ({ ...item, types: item.types.join(', '), features: item.features.join(', '), key: crypto.randomUUID() }));

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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <Image src={record.image} alt={record.name} width={50} height={50} />
      ),
    },
    {
      title: 'Types',
      dataIndex: 'types',
      key: 'types'
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features'
    },
    {
      title: <Link href='/dashboard/create-category' className='dashboard-add-new-btn'>New</Link>,
      key: 'action',
      render: (_, record) => (
        <div className='flex'>
          <Link 
            className='mr-3 flex justify-center items-center text-center dashboard-table-action-btn'
            href={`/edit-category/${record._id}`}
          >
            <EditOutlined />
          </Link>
          <Popconfirm
            title='Delete Category'
            description='Are you sure you want to delete this category?'
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
      ),
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

export default CategoriesTable;