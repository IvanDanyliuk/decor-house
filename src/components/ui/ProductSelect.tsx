'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal } from 'antd';
import { IProduct } from '@/lib/types/products.types';
import { CloseOutlined } from '@ant-design/icons';


interface IProductSelect {
  label: string;
  products: IProduct[];
  defaultValue?: IProduct[];
  onChange: (ids: string[]) => void;
}


const ProductSelect: React.FC<IProductSelect> = ({ label, products, defaultValue, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>(defaultValue || []);

  const handleProductSelectModalOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  const isChecked = (id: string) => {
    return Boolean(selectedProducts.find(item => item._id === id));
  };

  const handleProductSelect = (product: IProduct) => {
    const isSelected = isChecked(product._id!)
    if(isSelected) {
      setSelectedProducts(prevState => prevState.filter(item => item._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleProductDelete = (id: string) => {
    setSelectedProducts(prevState => prevState.filter(product => product._id !== id));
  };

  useEffect(() => {
    const productIds = selectedProducts.map(product => product._id!);
    onChange(productIds);
  }, [selectedProducts])

  return (
    <>
      <button 
        type='button'
        disabled={products.length === 0}
        onClick={handleProductSelectModalOpen}
        className='w-full md:w-52 h-16 dashboard-add-new-btn'
      >
        <span className='block'>{products.length !== 0 ? label : 'No products'}</span>
        {
          products.length > 0 && (
            <span className='block text-xs'>
              {`${products.length} product${products.length > 1 ? 's' : ''} available`}
            </span>
          )
        }
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
        <ul className='pt-8 grid grid-cols-2 md:grid-cols-4 gap-6'>
          {products.map(product => (
            <li 
              key={crypto.randomUUID()} 
              onClick={() => handleProductSelect(product)}
              className='relative p-3 flex items-center gap-6 border border-gray-medium rounded'
            >
              <input 
                type='checkbox' 
                defaultChecked={isChecked(product._id!)}
                className='absolute top-3 right-3' 
              />
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
      <ul className='relative w-full flex-1 overflow-y-scroll'>
        {selectedProducts.map((product) => (
          <li 
            key={crypto.randomUUID()}
            className='my-1 pr-3 flex justify-between items-center'
          >
            <div className='w-full flex gap-6 items-center'>
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                width={50} 
                height={50} 
              />
              <span className='w-36'>{product.name}</span>
              <span className='w-36'>{typeof product.category !== 'string' && product.category.name}</span>
              <span className='w-36'>&euro;{product.price}</span>
            </div>
            <CloseOutlined onClick={() => handleProductDelete(product._id!)} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductSelect;