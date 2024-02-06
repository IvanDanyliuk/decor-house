'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IInterior } from '@/lib/types/interior.types';
import { useWindowSize } from '@/utils/hooks';
import SliderNavPanel from '../ui/SliderNavPanel';


interface IInteriors {
  interiors: IInterior[];
}


const Interiors: React.FC<IInteriors> = ({ interiors }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [productsToShow, setProductsToShow] = useState(3);

  const { width } = useWindowSize();

  return (
    <div className='flex flex-col'>
      <div className='w-full container mx-auto flex justify-between items-center'>
        <h3 className='pb-6 text-5xl font-semibold'>
          Interior <span className='font-bold uppercase'>Designs</span>
        </h3>
        <Link href='/catalog' className='px-5 py-3 md:p-0 flex items-center gap-3 bg-main-bg md:bg-white'>
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
              className='relative w-full md:w-1/3 bg-white'
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className='relative w-full h-80 flex justify-center items-center group border'
              >
                <Image 
                  src={interior.image} 
                  alt={interior._id!} 
                  quality={100}
                  className='w-full h-full object-cover'
                  fill
                  
                />
                <div className='absolute w-full h-full group-hover:flex justify-center items-center hidden bg-black bg-opacity-75 text-white'>
                  <p>{interior.title}</p>
                </div>
              </motion.div>
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