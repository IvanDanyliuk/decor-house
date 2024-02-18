'use client';

import { useState } from 'react';

enum TabNames {
  Popular = 'popular',
  Viewed = 'viewed'
}


const RelatedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TabNames.Popular);

  const handleActiveTabChange = () => {
    if(activeTab === TabNames.Popular) {
      setActiveTab(TabNames.Viewed);
    } else {
      setActiveTab(TabNames.Popular);
    }
  };
  
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