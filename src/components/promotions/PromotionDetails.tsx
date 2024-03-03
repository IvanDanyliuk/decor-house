'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Divider } from 'antd';
import { IPromotion } from '@/lib/types/propmotions.types'
import { formatPromotionPeriod } from '@/utils/helpers';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import ProductsGallery from '../ui/ProductsGallery';
import { DISABLED_ARROW_COLOR } from '@/lib/constants';


interface IPromotionDetails {
  promotion: IPromotion;
}


const PromotionDetails: React.FC<IPromotionDetails> = ({ promotion }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [productsToShow, setProductsToShow] = useState(3);

  const { width } = useWindowSize();

  const showPreviousItem = () => {
    if(currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showNextItem = () => {
    if(promotion.products && currentIndex <= promotion.products.length) {
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
    <div className='container mx-auto py-6'>
      <div className='relative w-full flex flex-col-reverse md:flex-row gap-6 md:gap-10'>
        <div className='flex-1'>
          <h1 className='text-3xl text-center md:text-left font-bold uppercase'>
            {promotion.title}
          </h1>
          <p className='text-center md:text-left text-gray-dark font-semibold'>
            {formatPromotionPeriod(promotion.periodFrom, promotion.periodTo)}
          </p>
          <Divider className='my-3' />
          <p className=''>
            {promotion.description}
          </p>
        </div>
        <div className='relative w-full md:w-1/2 h-[50vh]'>
          <Image 
            src={promotion.image} 
            alt={promotion._id!} 
            quality={100}
            className='w-full h-full object-cover'
            fill 
          />
        </div>
      </div>
      <Divider />
      <div>
        <ProductsGallery 
          currentItemIndex={currentIndex} 
          productsToShow={productsToShow} 
          products={promotion.products} 
        />
        <div className='flex justify-between items-center'>
          {promotion.products && (
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
                disabled={currentIndex === promotion.products.length - 1}
                onClick={showNextItem}
              >
                <Image
                  src='/assets/icons/right-arrow.svg'
                  alt='next'
                  width={30}
                  height={30}
                  style={{ 
                    filter: currentIndex ===  promotion.products.length - 1 ? DISABLED_ARROW_COLOR : '' 
                  }}
                />
              </button>
            </div>
          )}
          <Link href='/promotions' className='px-5 py-2 link-primary'>See other promotions</Link>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetails;