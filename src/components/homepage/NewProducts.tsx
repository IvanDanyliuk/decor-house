'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@/lib/types/products.types';
import SliderNavPanel from '../ui/SliderNavPanel';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import ProductsGallery from '../ui/ProductsGallery';


interface INewProducts {
  products: IProduct[];
}


const NewProducts: React.FC<INewProducts> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [productsToShow, setProductsToShow] = useState(3);

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
      <div className='home-page-section-heading'>
        <h3>
          New <span>Products</span>
        </h3>
        <Link href='/catalog'>
          <span className='text-semibold'>
            {`All${width && width >= 640 ? ' new items' : ''}`}
          </span>
          <Image
            src='/assets/icons/right-arrow.svg'
            alt='next'
            width={30}
            height={30}
          />
        </Link>
      </div>
      <div className='py-8'>
        <ProductsGallery 
          products={products} 
          currentItemIndex={currentIndex} 
          productsToShow={productsToShow} 
        />
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