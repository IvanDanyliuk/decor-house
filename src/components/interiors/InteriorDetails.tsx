'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Divider } from 'antd';
import { IInterior } from '@/lib/types/interior.types';
import { DISABLED_ARROW_COLOR } from '@/lib/constants';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import ProductsGallery from '../ui/ProductsGallery';


interface IInteriorDetails {
  interior: IInterior;
}


const InteriorDetails: React.FC<IInteriorDetails> = ({ interior }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [productsToShow, setProductsToShow] = useState(3);

  const { width } = useWindowSize();

  const showPreviousItem = () => {
    if(currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showNextItem = () => {
    if(interior.products && currentIndex <= interior.products.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if(width && width >= 640) {
      setProductsToShow(3);
    } else {
      setProductsToShow(1);
    }
  }, [width]);

  return (
    <div className='container mx-auto'>
      <div className='relative w-full h-72 md:h-[80vh]'>
        <Image 
          src={interior.image} 
          alt={interior._id!} 
          quality={100}
          className='w-full h-full object-cover'
          fill 
        />
      </div>
      <h1 className='my-6 px-3 md:px-0 text-3xl text-center font-bold uppercase'>
        {interior.title}
      </h1>
      <Divider className='my-6' />
      <p className='mb-6 px-3 md:px-0 text-gray-dark'>
        {interior.description}
      </p>
      <div className='py-6'>
        <ProductsGallery 
          currentItemIndex={currentIndex} 
          productsToShow={productsToShow} 
          products={interior.products} 
        />
        <div className='px-3 md:px-0 flex justify-between items-center'>
          {interior.products && (
            <div className='flex gap-6'>
              <button
                type='button'
                disabled={currentIndex === 0}
                onClick={showPreviousItem}
              >
                <Image 
                  src='/assets/icons/left-arrow.svg'
                  alt='previous'
                  width={30}
                  height={30}
                  style={{ 
                    filter: currentIndex ===  0 ? DISABLED_ARROW_COLOR : '' 
                  }}
                />
              </button>
              <button
                type='button'
                disabled={currentIndex === interior.products.length - 1}
                onClick={showNextItem}
              >
                <Image
                  src='/assets/icons/right-arrow.svg'
                  alt='next'
                  width={30}
                  height={30}
                  style={{ 
                    filter: currentIndex ===  interior.products.length - 1 ? DISABLED_ARROW_COLOR : '' 
                  }}
                />
              </button>
            </div>
          )}
          <Link 
            href='/promotions' 
            className='px-5 py-2 link-primary'
          >
            See other interiors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InteriorDetails;