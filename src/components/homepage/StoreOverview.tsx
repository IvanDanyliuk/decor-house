'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Divider } from 'antd';
import SliderNavPanel from '../ui/SliderNavPanel';


const galleryItems = [
  {
    imagePath: '/assets/images/interior-1.jpg',
    heading: {
      topText: 'Furniture',
      bottomText: 'to order',
    },
    content: 'Our world of design is based on experience and competence gathered in the design trade over the past years. The three pillars of our success: Exclusive design goods, comfortable multi-channel shopping, and individual service.',
  },
  {
    imagePath: '/assets/images/interior-2.jpg',
    heading: {
      topText: 'Explore our',
      bottomText: 'interiors',
    },
    content: 'Our world of design is based on experience and competence gathered in the design trade over the past years. The three pillars of our success: Exclusive design goods, comfortable multi-channel shopping, and individual service.',
  },
  {
    imagePath: '/assets/images/interior-3.png',
    heading: {
      topText: 'We offer the',
      bottomText: 'best quality',
    },
    content: 'Our world of design is based on experience and competence gathered in the design trade over the past years. The three pillars of our success: Exclusive design goods, comfortable multi-channel shopping, and individual service.',
  },
];


const StoreOverview: React.FC = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);

  return (
    <div className='w-full'>
      <div className='relative w-full mx-auto px-3 md:px-0 container flex flex-wrap flex-col md:flex-row'>
        <div className='w-full md:w-1/2'>
          <img 
            src={galleryItems[currentItemIndex].imagePath} 
            alt={`Item ${currentItemIndex}`} 
            className='md:absolute w-full md:w-[36rem] md:h-[36rem] rounded-xl z-10'
          />
        </div>
        <div className='w-full md:w-1/2 md:h-[32rem] flex flex-col justify-center'>
          <h3 className='pt-6 text-3xl md:text-5xl'>
            <span className='md:block font-semibold'>
              {galleryItems[currentItemIndex].heading.topText}
            </span>
            &nbsp;
            <span className='md:block font-bold uppercase'>
              {galleryItems[currentItemIndex].heading.bottomText}
            </span>
          </h3>
          <Divider />
          <p className='text-sm md:text-base'>
            {galleryItems[currentItemIndex].content}
          </p>
          <Divider />
          <Link 
            href='/catalog' 
            className='py-3 wfull md:w-72 link-primary'
          >
            Catalog
          </Link>
        </div>
      </div>
      <div className='relative w-full flex justify-end bg-main-bg'>
        <div className='relative mx-auto px-3 w-full container flex justify-end'>
          <SliderNavPanel 
            currentIndex={currentItemIndex} 
            itemsCount={galleryItems.length} 
            onSetCurrentItem={setCurrentItemIndex} 
            containerStyles='md:w-1/2'
          />
        </div>
      </div>
    </div>
  );
};

export default StoreOverview;