'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'
import { ICategory, IPremiumCategory } from '@/lib/types/category.types';
import { setUrlString } from '@/utils/helpers';


interface ICategoriesListLayout {
  categories: (ICategory | IPremiumCategory)[];
  [key: string]: any;
}


const CategoriesListLayout: React.FC<ICategoriesListLayout> = ({ categories, ...props }) => {
  return (
    <ul className={props.className}>
      {categories.map(category => (
        <li 
          key={crypto.randomUUID()}
          className='relative overflow-hidden group'
        >
          <Link href={`/catalog/${setUrlString(category.name)}`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className='relative w-full h-full'
            >
              <Image 
                src={category.image} 
                alt={category._id!} 
                quality={100}
                className='w-full h-full object-cover'
                fill
              />
              <div className='absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50' />
            </motion.div>
            <div className='title'>
              <p className='text-xl uppercase z-10'>
                {category.name}
              </p>
              <p className='hidden group-hover:flex items-center gap-3 text-base'>
                <span>View Products</span>
                <Image 
                  src='/assets/icons/right-arrow.svg'
                  alt='previous'
                  width={30}
                  height={30}
                  style={{
                    filter: 'invert(1)'
                  }}
                />
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoriesListLayout;