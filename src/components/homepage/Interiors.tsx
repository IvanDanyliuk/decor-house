'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { IInterior } from '@/lib/types/interior.types';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import SliderNavPanel from '../ui/SliderNavPanel';


interface IInteriors {
  interiors: IInterior[];
}


const Interiors: React.FC<IInteriors> = ({ interiors }) => {
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
          Interior <span>Designs</span>
        </h3>
        <Link href='/interiors  '>
          <span className='text-semibold'>
            {`All${width && width >= 640 ? ' interiors' : ''}`}
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
        <div className='mb-8 md:mb-16 w-full flex gap-10'>
          {interiors.slice(currentIndex, currentIndex + productsToShow).map(interior => (
            <Link 
              key={crypto.randomUUID()}
              href={`/catalog/${interior._id}`} 
              className='relative w-full md:w-1/3 bg-white overflow-hidden rounded-lg'
            >
              <AnimatePresence>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className='relative w-full h-96 flex justify-center items-center group'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Image 
                    src={interior.image} 
                    alt={interior._id!} 
                    quality={100}
                    className='w-full h-full object-cover'
                    fill
                  />
                  <div className='absolute left-0 bottom-0 w-full h-fit md:h-full px-8 py-6 md:py-14 md:group-hover:flex justify-center items-end md:hidden bg-black bg-opacity-75 text-white'>
                    <p className='text-lg text-center font-semibold uppercase'>
                      {interior.title}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Link>
          ))}
        </div>
        <div className='container mx-auto'>
          <SliderNavPanel 
            currentIndex={currentIndex} 
            itemsCount={interiors.length} 
            onSetCurrentItem={setCurrentIndex} 
            containerStyles='relative'
          />
        </div>
      </div>
    </div>
  );
};

export default Interiors;