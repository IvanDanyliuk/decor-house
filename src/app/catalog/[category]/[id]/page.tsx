'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { viewProduct } from '@/lib/actions/user.actions';
import { getProduct } from '@/lib/queries/product.queries';
import { IProduct } from '@/lib/types/products.types';
import SliderNavPanel from '@/components/ui/SliderNavPanel';


enum ProductTabs {
  Description = 'description',
  Characteristics = 'characteristics'
}


const page = ({ params }: { params: { category: string, id: string } }) => {
  const { category, id } = params;
  const { data: session } = useSession();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<keyof IProduct>(ProductTabs.Description);

  const handleActiveTabChange = () => {
    setCurrentIndex(0);
    if(activeTab === ProductTabs.Description) {
      setActiveTab(ProductTabs.Characteristics);
    } else {
      setActiveTab(ProductTabs.Description);
    }
  };

  useEffect(() => {
    getProduct(id).then(res => setProduct(res));
    viewProduct(session?.user?.email!, id).then(res => console.log(res))
  }, []);

  return (
    <div className='w-full'>
      <section className='w-full bg-main-bg'>
        <p className='container mx-auto mb-3 py-8 flex gap-1 text-sm font-semibold capitalize'>
          <Link href='/'>Home</Link>
          <span>/</span>
          <Link href='/catalog'>Catalog</Link>
          <span>/</span>
          <Link href={`/catalog/${category}`} className='capitalize'>{category}</Link>
        </p>
      </section>
      <section className='mx-auto container flex flex-col md:flex-row gap-6 md:gap-10'>
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
              <button type='button' className='add-to-cart-btn flex-1'>Add to cart</button>
              <button type='button' className='buy-now-btn flex-1'>Buy now</button>
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
      </section>
    </div>
  );
};

export default page;