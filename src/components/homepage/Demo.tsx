'use client';

import { SyntheticEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';


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
      <motion.div 
        data-isPlaying={isPlaying} 
        layout
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 50,
        }}
        className='demo-control-container'
      >
        <h5 className='text-2xl md:text-4xl font-semibold'>Decor House Stores</h5>
        <button className='flex items-center gap-3 z-20' type='button' onClick={handleClick}>
          {isPlaying ? (
            <PauseCircleOutlined className='text-3xl' />
          ) : (
            <>
              <PlayCircleOutlined className='text-3xl' />
              <span className='font-semibold'>View Demo</span>
            </>
          )}
        </button>
        <p className='text-center text-xs md:text-sm leading-6'>
          The multi-channel concept is the ideal way for us to be able to offer design enthusiasts 
          high-quality products both online and in store and comfortable access to our world of design. 
          Besides looking through our online shop, you have the possibility to browse through 5,000 
          square metres of various departments in the AmbienteDirect Store in Munich, Germany.
        </p>
        <Link
          href='/shops'
          className='w-full md:w-auto px-10 py-5 bg-white text-black font-semibold text-center uppercase rounded-lg'
        >
          Salons on the map
        </Link>
      </motion.div>
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