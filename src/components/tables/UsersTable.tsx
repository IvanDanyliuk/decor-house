'use client';

import Link from 'next/link';
import type { ColumnsType } from 'antd/es/table';
import { deleteUser } from '@/lib/actions/user.actions';
import { IUser } from '@/lib/types/user.types';
import Image from 'next/image';
import { Popconfirm, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


interface IUsersTable {
  users: IUser[];
}

interface DataType {
  _id?: string;
  name: string;
  photo: string;
  role: string;
  phone: string;
  email: string;
  address: string;
}


const UsersTable: React.FC<IUsersTable> = async ({ users }) => {
  const confirmDeleting = async (id: string) => {
    await deleteUser({ id, path: '/dashboard/users' });
  };

  const tableData = users.map(item => ({ ...item, key: crypto.randomUUID() }));

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
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (_, record) => (
        <Image src={record.photo} alt={record.name} width={50} height={50} />
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <div className='flex'>
          <Popconfirm
            title='Delete User'
            description='Are you sure you want to delete this user?'
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
    <Table 
      sticky
      columns={tableColumns} 
      dataSource={tableData} 
      pagination={false} 
    />
  );
};

export default UsersTable;