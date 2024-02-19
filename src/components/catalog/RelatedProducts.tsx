'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { getRelatedProducts } from '@/lib/queries/product.queries';
import { IProduct } from '@/lib/types/products.types';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import ProductsGallery from '../ui/ProductsGallery';

enum TabNames {
  Popular = 'popular',
  Viewed = 'viewed'
}

interface IRelatedProducts {
  popular: IProduct[];
  viewed: IProduct[];
}

const disabledArrowColor = 'invert(62%) sepia(0%) saturate(1438%) hue-rotate(164deg) brightness(104%) contrast(73%)';


const RelatedProducts: React.FC = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<keyof IRelatedProducts>(TabNames.Popular);
  const [products, setProducts] = useState<IRelatedProducts | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [productsToShow, setProductsToShow] = useState(3);

  const { width } = useWindowSize();

  const handleActiveTabChange = () => {
    setCurrentIndex(0);
    if(activeTab === TabNames.Popular) {
      setActiveTab(TabNames.Viewed);
    } else {
      setActiveTab(TabNames.Popular);
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
    if(width && width >= 640) {
      setProductsToShow(3);
    } else {
      setProductsToShow(1);
    }
  }, [width]);

  useEffect(() => {
    if(session && session.user) {
      getRelatedProducts(session?.user?.email!, 10).then(res => setProducts(res));
    }
  }, []);
  
  return (
    <div>
      <div className='related-products-nav-container'>
        <div className='flex'>
          <button 
            onClick={handleActiveTabChange}
            className={`related-products-nav-btn ${activeTab === TabNames.Popular ? 'btn-active' : ''}`}
          >
            Popular Products
          </button>
          <button 
            onClick={handleActiveTabChange}
            className={`related-products-nav-btn ${activeTab === TabNames.Viewed ? 'btn-active' : ''}`}
          >
            Viewed
          </button>
        </div>
        {products && (
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
                  filter: currentIndex ===  0 ? disabledArrowColor : '' 
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
                  filter: currentIndex ===  products[activeTab].length - 1 ? disabledArrowColor : '' 
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