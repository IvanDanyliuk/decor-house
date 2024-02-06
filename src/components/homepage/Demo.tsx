'use client';

import { PlayCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { SyntheticEvent, useRef, useState } from 'react';


const Demo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const ref = useRef<HTMLVideoElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    ref.current?.click();
  };

  const handleVideoPlay = (e: SyntheticEvent<HTMLVideoElement>) => {
    if(isPlaying) {
      e.currentTarget.pause();
      setIsPlaying(false);
    } else {
      e.currentTarget.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className='relative w-full'>
      <div className='absolute w-[90%] md:w-1/3 max-h-fit inset-x-0 inset-y-0 shadow-xl mx-auto my-auto p-10 flex flex-col justify-center items-center gap-6 bg-black bg-opacity-75 text-white rounded-lg z-10'>
        <h5 className='text-2xl md:text-4xl font-semibold'>Decor House Stores</h5>
        <button className='flex items-center gap-3 z-20' type='button' onClick={handleClick}>
          <PlayCircleOutlined className='text-3xl' />
          <span className='font-semibold'>View Demo</span>
        </button>
        <p className='text-center text-xs md:text-sm leading-6'>
          The multi-channel concept is the ideal way for us to be able to offer design enthusiasts 
          high-quality products both online and in store and comfortable access to our world of design. 
          Besides looking through our online shop, you have the possibility to browse through 5,000 
          square metres of various departments in the AmbienteDirect Store in Munich, Germany.
        </p>
        <Link
          href='/salons'
          className='w-full md:w-auto px-10 py-5 bg-white text-black font-semibold text-center uppercase rounded-lg'
        >
          Salons on the map
        </Link>
      </div>
      <video 
        ref={ref}
        src='/assets/videos/video-bg.mp4' 
        onClick={handleVideoPlay} 
        className='w-full h-[90vh] object-cover' 
      />
    </div>
  );
};

export default Demo;