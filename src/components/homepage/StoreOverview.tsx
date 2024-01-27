'use client';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


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
]

const StoreOverview: React.FC = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);

  const showPreviousItem = () => {
    if(currentItemIndex !== 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  const showNextItem = () => {
    if(currentItemIndex <= galleryItems.length) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  return (
    <div className='w-full'>
      <div className='w-full mx-auto container flex flex-wrap'>
        <div className='w-1/2'>
          <Image 
            src={galleryItems[currentItemIndex].imagePath} 
            alt={`Item ${currentItemIndex}`} 
            width={550} 
            height={550} 
          />
        </div>
        <div className='w-1/2'>
          <h3 className='text-5xl'>
            <span className='block font-semibold'>
              {galleryItems[currentItemIndex].heading.topText}
            </span>
            <span className='block font-bold uppercase'>
              {galleryItems[currentItemIndex].heading.bottomText}
            </span>
          </h3>
          <Divider />
          <p>
            {galleryItems[currentItemIndex].content}
          </p>
          <Divider />
          <Link 
            href='/catalog' 
            className='py-3 w-72 link-primary'
          >
            Catalog
          </Link>
        </div>
      </div>
      <div className='relative w-full flex justify-end bg-main-bg'>
        <div className='py-8 w-1/2 flex justify-between'>
          <div className='flex'>
            <div className='font-semibold text-lg'>
              {`0${currentItemIndex + 1}`}
            </div>
            <div className='font-semibold text-lg'>
              {`0${galleryItems.length}`}
            </div>
          </div>
          <div className='flex'>
            <button 
              type='button' 
              disabled={currentItemIndex === 0}
              onClick={showPreviousItem}
            >
              <ArrowLeftOutlined />
            </button>
            <button 
              type='button' 
              disabled={currentItemIndex === galleryItems.length - 1}
              onClick={showNextItem}
            >
              <ArrowRightOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOverview;