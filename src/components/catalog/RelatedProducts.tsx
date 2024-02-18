'use client';

import { getRelatedProducts } from '@/lib/queries/product.queries';
import { IProduct } from '@/lib/types/products.types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

enum TabNames {
  Popular = 'popular',
  Viewed = 'viewed'
}

interface IRelatedProducts {
  popular: IProduct[];
  viewed: IProduct[];
}


const RelatedProducts: React.FC = async () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<string>(TabNames.Popular);
  const [products, setProducts] = useState<IRelatedProducts | null>(null);


  const handleActiveTabChange = () => {
    if(activeTab === TabNames.Popular) {
      setActiveTab(TabNames.Viewed);
    } else {
      setActiveTab(TabNames.Popular);
    }
  };

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
        <div>
          Navigation
        </div>
      </div>
      <div>
        Content
      </div>
    </div>
  );
};

export default RelatedProducts;