'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Divider } from 'antd';


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

const disabledArrowColor = 'invert(62%) sepia(0%) saturate(1438%) hue-rotate(164deg) brightness(104%) contrast(73%)';

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
      <div className='relative w-full mx-auto container flex flex-wrap flex-col md:flex-row'>
        <div className='w-full md:w-1/2'>
          <img 
            src={galleryItems[currentItemIndex].imagePath} 
            alt={`Item ${currentItemIndex}`} 
            className='md:absolute w-full md:w-[36rem] md:h-[36rem] rounded-xl z-10'
          />
        </div>
        <div className='w-full md:w-1/2 h-[32rem] flex flex-col justify-center'>
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
        <div className='relative mx-auto w-full container flex justify-end'>
          <div className='py-10 w-1/2 flex justify-between'>
            <div className='flex font-semibold text-xl'>
              <div className={`${currentItemIndex === 0 ? 'text-accent-dark' : 'text-gray-regular'}`}>
                01
              </div>
              <ul className='mx-4 flex items-center'>
                {galleryItems.map((item, i) => (
                  <li 
                    key={crypto.randomUUID()}
                    onClick={() => setCurrentItemIndex(i)}
                    className={`cursor-pointer w-12 h-[4px] ${i === currentItemIndex ? 'bg-accent-dark' : 'bg-gray-regular'}`}
                  ></li>
                ))}
              </ul>
              <div className={`${currentItemIndex === galleryItems.length - 1 ? 'text-accent-dark' : 'text-gray-regular'}`}>
                {`0${galleryItems.length}`}
              </div>
            </div>
            <div className='flex gap-8'>
              <button 
                type='button' 
                disabled={currentItemIndex === 0}
                onClick={showPreviousItem}
              >
                <Image 
                  src='/assets/icons/left-arrow.svg'
                  alt='previous'
                  width={30}
                  height={30}
                  style={{ 
                    filter: currentItemIndex ===  0 ? disabledArrowColor : '' 
                  }}
                />
              </button>
              <button 
                type='button' 
                disabled={currentItemIndex === galleryItems.length - 1}
                onClick={showNextItem}
              >
                <Image
                  src='/assets/icons/right-arrow.svg'
                  alt='next'
                  width={30}
                  height={30}
                  style={{ 
                    filter: currentItemIndex ===  galleryItems.length - 1 ? disabledArrowColor : '' 
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOverview;