'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table } from 'antd';
import dayjs from 'dayjs';
import { deletePost } from "@/lib/actions/post.actions";
import { IPost } from "@/lib/types/post.types"


interface IPostsTable {
  posts: IPost[];
}

interface DataType {
  _id?: string;
  title: string;
  image: string;
  publicationDate: string;
  tags: string;
}


const PostsTable: React.FC<IPostsTable> = ({ posts }) => {
  const confirmDeleting = async (id: string) => {
    await deletePost({ id, path: '/dashboard/posts' });
  };

  const tableData = posts.map(item => ({ 
    ...item, 
    tags: item.tags.map((tag: any) => tag.name).join(', '), 
    publicationDate: dayjs(item.publicationDate).format('DD.MM.YYYY'), 
    key: crypto.randomUUID(),
  }));

  const tableColumns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
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
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags'
    },
    {
      title: 'Publication Date',
      dataIndex: 'publicationDate',
      key: 'publicationDate'
    },
    {
      title: <Link href='/dashboard/create-post' className='dashboard-add-new-btn'>New</Link>,
      key: 'action',
      render: (_, record) => (
        <div className='flex'>
          <Link 
            className='mr-3 flex justify-center items-center text-center dashboard-table-action-btn'
            href={`/dashboard/edit-post/${record._id!}`}
          >
            <EditOutlined />
          </Link>
          <Popconfirm
            title='Delete Post'
            description='Are you sure you want to delete this post?'
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

export default PostsTable;