'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { getPosts } from '@/lib/queries/post.queries';
import { IPost } from '@/lib/types/post.types';
import Select from '../ui/Select';
import { formatDate } from '@/utils/helpers';


interface IBlogDetails {
  categories: {
    label: string;
    value: string;
  }[];
}


const BlogDetails: React.FC<IBlogDetails> = ({ categories }) => {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [tags, setTags] = useState<string>('');

  const handleSetTags = (value: string) => {
    setPage(1);
    setPosts([]);
    setTags(value);
  };

  const handleTagDelete = (tag: string) => {
    const tagsArr = tags.split(', ');
    const updatedTagList = tagsArr.filter(item => item !== tag).join(', ');
    setTags(updatedTagList);
  };

  const clearTags = () => {
    setTags('');
  };

  useEffect(() => {
    getPosts({ page, itemsPerPage: 5, tags })
      .then(res => {
        setPosts([...posts, ...res.data.posts]);
        setPostsCount(res.data.count);
      })
  }, [page, tags]);

  return (
    <div className='py-3'>
      <div className='flex gap-10'>
        <div className='w-full md:w-1/4 flex gap-6'>
          <Select 
            name='tag' 
            title='Select tags' 
            options={categories} 
            onChange={handleSetTags} 
            multiple 
          />
          <button 
            type='button' 
            onClick={clearTags}
            className='w-28'
          >
            Clear Tags
          </button>
        </div>
        <ul className='flex flex-wrap flex-1 gap-3'>
          {tags && tags.split(', ').map(tag => (
            <li 
              key={crypto.randomUUID()}
              className='px-3 py-2 flex gap-3 text-semibold bg-main-bg'
            >
              <span>{categories.find(item => item.value === tag)?.label}</span>
              <CloseOutlined onClick={() => handleTagDelete(tag)} className='cursor-pointer' />
            </li>
          ))}
        </ul>
      </div>
      <ul className='py-3 w-full grid grid-cols-1 md:grid-cols-2 gap-14'>
        {posts.map((post, i) => (
          <li key={crypto.randomUUID()} className={i === 0 ? 'col-span-1 md:col-span-2' : 'col-span-1'}>
            <Link href={`/blog/${post._id!}`}>
              <div className={`relative w-full ${i === 0 ? 'h-96 md:h-[80vh]' : 'h-96'} overflow-hidden`}>
                <motion.div 
                  className='relative w-full h-full'
                  whileHover={{ scale: 1.1 }}
                >
                  <Image 
                    src={post.image} 
                    alt={post._id!} 
                    quality={100}
                    className='w-full h-full object-cover'
                    fill
                  />
                </motion.div>
              </div>
              <p className='mt-3 text-gray-dark text-sm'>
                {formatDate(post.createdAt!)}
              </p>
              <Divider className='my-3' />
              <h5 className='text-xl md:text-2xl font-semibold uppercase'>
                {post.title}
              </h5>
            </Link>
          </li>
        ))}
      </ul>
      {postsCount > posts.length && (
          <button 
            onClick={(e) => {
              e.preventDefault()
              setPage(page + 1)
            }}
            className='w-full block mx-auto my-8 md:w-80 px-4 py-2 text-base font-semibold border border-accent-dark rounded-md'
          >
            View More
          </button>
        )}
    </div>
  );
};

export default BlogDetails;