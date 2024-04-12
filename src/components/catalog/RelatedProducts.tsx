'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { IRelatedProducts } from '@/lib/types/products.types';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import ProductsGallery from '../ui/ProductsGallery';
import { DISABLED_ARROW_COLOR } from '@/lib/constants';


interface IRelatedProductsProps {
  categoryId?: string;
  products: IRelatedProducts;
}

enum TabNames {
  Related = 'related',
  Viewed = 'viewed'
}


const RelatedProducts: React.FC<IRelatedProductsProps> = ({ categoryId, products }) => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<keyof IRelatedProducts>(TabNames.Related);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [productsToShow, setProductsToShow] = useState(3);

  const { width } = useWindowSize();

  const handleActiveTabChange = () => {
    setCurrentIndex(0);
    if(activeTab === TabNames.Related) {
      setActiveTab(TabNames.Viewed);
    } else {
      setActiveTab(TabNames.Related);
    }
  };

  const showPreviousItem = () => {
    if(currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showNextItem = () => {
    if(products && currentIndex <= products[activeTab].length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if(!session?.user && products.viewed.length === 0) {

    }  
  }, []);

  useEffect(() => {
    if(width && width >= 640) {
      setProductsToShow(3);
    } else {
      setProductsToShow(1);
    }
  }, [width]);
  
  return (
    <div>
      <div className='related-products-nav-container'>
        <div className='flex'>
          <button 
            onClick={handleActiveTabChange}
            className={`related-products-nav-btn ${activeTab === TabNames.Related ? 'btn-active' : ''}`}
          >
            {categoryId ? 'Similar Products' : 'Popular Products'}
          </button>
          <button 
            onClick={handleActiveTabChange}
            className={`related-products-nav-btn ${activeTab === TabNames.Viewed ? 'btn-active' : ''}`}
          >
            Viewed
          </button>
        </div>
        {products && (
          <div className='mr-3 md:mr-0 flex gap-6'>
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
              disabled={currentIndex === products[activeTab].length - 1}
              onClick={showNextItem}
            >
              <Image
                src='/assets/icons/right-arrow.svg'
                alt='next'
                width={30}
                height={30}
                style={{ 
                  filter: currentIndex ===  products[activeTab].length - 1 ? DISABLED_ARROW_COLOR : '' 
                }}
              />
            </button>
          </div>
        )}
      </div>
      <div className='pt-16'>
        {products && (
          <ProductsGallery 
            products={products[activeTab]} 
            currentItemIndex={currentIndex} 
            productsToShow={productsToShow} 
          />
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;