'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IProduct } from '@/lib/types/products.types';
import { updateCart } from '@/lib/actions/user.actions';
import SliderNavPanel from '../ui/SliderNavPanel';


interface IProductDetails {
  product: IProduct;
}

enum ProductTabs {
  Description = 'description',
  Characteristics = 'characteristics'
}


const ProductDetails: React.FC<IProductDetails> = ({ product }) => {
  const router = useRouter();
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<keyof IProduct>(ProductTabs.Description);
  const { data: session } = useSession();

  const handleActiveTabChange = () => {
    setCurrentIndex(0);
    if(activeTab === ProductTabs.Description) {
      setActiveTab(ProductTabs.Characteristics);
    } else {
      setActiveTab(ProductTabs.Description);
    }
  };

  const handleAddToCart = async () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const isProductInCart = cart.some((item: any) => item.product._id === product._id);

    if(!isProductInCart) {
      localStorage.setItem('cart', JSON.stringify([
        ...cart,
        {
          product,
          quantity: 1,
        }
      ]));
      window.dispatchEvent(new Event('storage'));

      if(session?.user) {
        await updateCart(session?.user?.email!, [
          ...cart,
          {
            product,
            quantity: 1,
          }
        ]);
      }
    }
  };

  const handleBuyNow = async () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const isProductInCart = cart.some((item: any) => item.product._id === product._id);

    if(!isProductInCart) {
      localStorage.setItem('cart', JSON.stringify([
        ...cart,
        {
          product,
          quantity: 1,
        }
      ]));
      window.dispatchEvent(new Event('storage'));

      if(session?.user) {
        await updateCart(session?.user?.email!, [
          ...cart,
          {
            product,
            quantity: 1,
          }
        ]);

        router.push('/checkout')
      }
    }
  }

  useEffect(() => {
    if(!session?.user) {
      const viewedProductsString = localStorage.getItem('viewed') || '[]';
      const viewedProducts = JSON.parse(viewedProductsString);
      const isProductInCart = viewedProducts.some((item: any) => item._id === product._id);
      if(!isProductInCart) {
        localStorage.setItem('viewed', JSON.stringify([
          ...viewedProducts,
          product
        ]));
      }
    }
  }, [])

  return (
    <>
      <div className='relative h-full flex flex-col flex-1'>
        <div className='w-full'>
          <img 
            src={product?.images[currentIndex]} 
            alt={`Item ${currentIndex}`} 
            className='w-full mx-auto md:w-[36rem] md:h-[36rem] rounded-xl'
          />
        </div>
        <SliderNavPanel 
          currentIndex={currentIndex} 
          itemsCount={product?.images.length!} 
          onSetCurrentItem={setCurrentIndex} 
        />
      </div>
      <div className='py-6 flex flex-col flex-1 gap-10 md:gap-16'>
        <div>
          <h2 className='text-2xl text-center md:text-left font-semibold'>
            {product?.type}
          </h2>
          <h1 className='my-6 text-4xl text-center md:text-left font-bold uppercase'>
            {product?.name}
          </h1>
          <h3 className='mb-6 text-xl text-center md:text-left font-semibold'>
            {product?.manufacturer.name}
          </h3>
          <ul className='flex justify-center md:justify-start gap-3'>
            {product?.colors.map(color => (
              <li key={crypto.randomUUID()}>
                <div className='w-6 h-6 rounded-full border' style={{ background: color }} />
              </li>
            ))}
          </ul>
          <p className='mt-8 text-3xl text-center md:text-left font-bold'>
            &euro;{product?.price}
          </p>
        </div>
        <div className='mt-10'>
          <div className='mb-6 w-full flex gap-6'>
            <button 
              type='button' 
              className='add-to-cart-btn flex-1'
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button 
              type='button' 
              className='buy-now-btn flex-1'
              onClick={handleBuyNow}
            >
              Buy now
            </button>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='related-products-nav-container'>
              <div className='w-full flex'>
                <button 
                  onClick={handleActiveTabChange}
                  className={`related-products-nav-btn flex-1 ${activeTab === ProductTabs.Description ? 'btn-active' : ''}`}
                >
                  Description
                </button>
                <button 
                  onClick={handleActiveTabChange}
                  className={`related-products-nav-btn flex-1 ${activeTab === ProductTabs.Characteristics ? 'btn-active' : ''}`}
                >
                  Characteristics
                </button>
              </div>
            </div>
            <p>
              {activeTab === ProductTabs.Description ? 
                product?.description : 
                product?.characteristics
              }
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails