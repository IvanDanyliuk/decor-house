'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Modal } from 'antd';
import { IProduct } from '@/lib/types/products.types';


interface IProductSelect {
  products: IProduct[];
  onChange: () => void;
}

const ProductSelect: React.FC<IProductSelect> = ({ products, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductSelectModalOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <>
      <button 
        type='button'
        disabled={products.length === 0}
        onClick={handleProductSelectModalOpen}
      >
        Add Products
      </button>
      <Modal
        open={isOpen}
        centered
        closable
        width={'90%'}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={handleProductSelectModalOpen}
      >
        <ul className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {products.map(product => (
            <li key={crypto.randomUUID()} className='relative p-3 flex items-center gap-6 border border-gray-medium rounded'>
              <input type='checkbox' className='absolute top-3 right-3' />
              <div>
                <Image 
                  src={product.images[0]} 
                  alt={product.name} 
                  width={50} 
                  height={50} 
                />
              </div>
              <div>
                <div>{product.name}</div>
                <div>{typeof product.category !== 'string' && product.category.name}</div>
                <div>&euro;{product.price}</div>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default ProductSelect;