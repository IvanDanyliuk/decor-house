'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Popconfirm, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { IPromotion } from '@/lib/types/propmotions.types'
import { deletePromotion } from '@/lib/actions/promotion.actions';


interface IPromotionsTable {
  promotions: IPromotion[]
}

interface DataType {
  _id?: string;
  title: string;
  image: string;
  periodFrom: string;
  periodTo: string;
  products: any
}


const PromotionsTable: React.FC<IPromotionsTable> = ({ promotions }) => {
  const confirmDeleting = async (id: string) => {
    await deletePromotion({ id, path: '/dashboard/promotions' });
  };

  const tableData = promotions.map(item => ({ 
    ...item, 
    periodFrom: dayjs(item.periodFrom).format('DD.MM.YYYY'),
    periodTo: dayjs(item.periodTo).format('DD.MM.YYYY'),
    products: `${item.products.length} product${item.products.length > 1 && 's'}`, 
    key: crypto.randomUUID() }));

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
      title: 'From',
      dataIndex: 'periodFrom',
      key: 'periodFrom',
    },
    {
      title: 'To',
      dataIndex: 'periodTo',
      key: 'periodTo',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
    },
    {
      title: <Link href='/dashboard/create-promotion' className='dashboard-add-new-btn'>New</Link>,
      key: 'action',
      render: (_, record) => (
        <div className='flex'>
          <Link 
            className='mr-3 flex justify-center items-center text-center dashboard-table-action-btn'
            href={`/dashboard/edit-promotion/${record._id}`}
          >
            <EditOutlined />
          </Link>
          <Popconfirm
            title='Delete Promotion'
            description='Are you sure you want to delete this promotion?'
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
    <Table 
      sticky
      columns={tableColumns} 
      dataSource={tableData} 
      pagination={false} 
    />
  );
};

export default PromotionsTable;