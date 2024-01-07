'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Popconfirm, Tag } from 'antd';
import Table from 'antd/es/table';
import type { ColumnsType } from 'antd/es/table';
import { IManufacturer } from '@/lib/types/manufacturer.types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteProduct } from '@/lib/actions/product.actions';


interface IProductsTable {
  products: {
    _id: string;
    category: {
      _id: string;
      name: string;
    };
    type: string;
    features: string[];
    name: string;
    description: string;
    size: {
      width: string;
      height: string;
      depth: string;
    }
    manufacturer: IManufacturer;
    characteristics: string;
    price: string;
    sale: string;
    images: string[];
    colors: string[];
  }[];
}

interface DataType {
  _id: string;
  images: string;
  name: string;
  manufacturer: IManufacturer;
  category: {
    _id: string;
    name: string;
  };
  type: string;
  features: string[];
  description: string;
  size: {
    width: string;
    height: string;
    depth: string;
  }
  characteristics: string;
  price: string;
  sale: string;
  colors: string[];
}


const ProductsTable: React.FC<IProductsTable> = ({ products }) => {
  const confirmDeleting = async (id: string) => {
    await deleteProduct({ id, path: '/dashboard/products' });
  };

  const tableData = products.map(item => ({ ...item, images: item.images[0], key: crypto.randomUUID() }));

  const tableColumns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (_, record) => (
        <Image src={record.images} alt={record.name} width={50} height={50} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
      render: (_, record) => <span>{`${record.manufacturer.name}, ${record.manufacturer.country}`}</span>,
    },
    {
      title: 'Colors',
      dataIndex: 'colors',
      key: 'colors',
      render: (_, record) => (
        <ul className='flex flex-wrap gap-1'>
          {record.colors.map(color => (
            <li 
              key={crypto.randomUUID()}
            >
              <Tag color={color} className='w-4 h-4 border border-gray-100 rounded-full' />
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => <span>{record.category.name}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: <Link href='/dashboard/create-product' className='dashboard-add-new-btn'>New</Link>,
      key: 'action',
      render: (_, record) => (
        <div className='flex'>
          <Link 
            className='mr-3 flex justify-center items-center text-center dashboard-table-action-btn'
            href={`/dashboard/edit-product/${record._id}`}
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

export default ProductsTable;