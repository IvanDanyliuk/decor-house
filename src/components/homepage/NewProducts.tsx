'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Divider } from 'antd';
import { IProduct } from '@/lib/types/products.types';
import SliderNavPanel from '../ui/SliderNavPanel';
import { useWindowSize } from '@/utils/hooks';


interface INewProducts {
  products: IProduct[];
}


const NewProducts: React.FC<INewProducts> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [productsToShow, setProductsToShow] = useState(4);

  const { width } = useWindowSize();

  useEffect(() => {
    if(width && width >= 640) {
      setProductsToShow(3);
    } else {
      setProductsToShow(1);
    }
  }, [width]);

  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center'>
        <h3 className='pb-6 text-5xl font-semibold'>
          New <span className='font-bold uppercase'>Products</span>
        </h3>
        <Link href='/catalog' className='flex items-center gap-3'>
          <span className='text-semibold'>All new items</span>
          <Image
            src='/assets/icons/right-arrow.svg'
            alt='next'
            width={30}
            height={30}
          />
        </Link>
      </div>
      <div className='py-8'>
        <div className='mb-16 w-full flex gap-10'>
          {products.slice(currentIndex, currentIndex + productsToShow).map(product => (
            <Link 
              key={crypto.randomUUID()}
              href={`/catalog/${product._id}`} 
              className='relative flex-1 bg-white group'
            >
              <div className='w-full min-h-max flex justify-center items-center'>
                <Image 
                  src={product.images[0]} 
                  alt={product.name} 
                  width={350} 
                  height={350} 
                />
              </div>
              <div className='mt-6 text-center text-lg font-semibold'>
                {product.name}
              </div>
              <Divider className='my-6' />
              <div className='text-center text-2xl font-bold'>
                &euro;{product.price}
              </div>
            </Link>
          ))}
        </div>
        <SliderNavPanel 
          currentIndex={currentIndex} 
          itemsCount={products.length} 
          onSetCurrentItem={setCurrentIndex} 
          containerStyles='relative'
        />
      </div>
    </div>
  );
};

export default NewProducts;