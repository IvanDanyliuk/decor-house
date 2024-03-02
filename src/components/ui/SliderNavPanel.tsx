'use client';

import { DISABLED_ARROW_COLOR } from '@/lib/constants';
import Image from 'next/image';

interface ISliderNavPanle {
  currentIndex: number;
  itemsCount: number;
  onSetCurrentItem: (index: number) => void;
  containerStyles?: string;
}


const SliderNavPanel: React.FC<ISliderNavPanle> = ({ 
  currentIndex, 
  itemsCount,
  onSetCurrentItem,
  containerStyles
}) => {
  const items = new Array(itemsCount).fill('');

  const showPreviousItem = () => {
    if(currentIndex !== 0) {
      onSetCurrentItem(currentIndex - 1);
    }
  };

  const showNextItem = () => {
    if(currentIndex <= itemsCount) {
      onSetCurrentItem(currentIndex + 1);
    }
  };

  return (
    <div className={`py-10 w-full flex justify-between ${containerStyles || ''}`}>
      <div className='flex font-semibold text-xl'>
        <div className={`${currentIndex === 0 ? 'text-accent-dark' : 'text-gray-regular'}`}>
          01
        </div>
        <ul className='mx-4 flex items-center'>
          {items.map((item, i) => (
            <li 
              key={crypto.randomUUID()}
              onClick={() => onSetCurrentItem(i)}
              className={`cursor-pointer w-6 md:w-12 h-[4px] ${i === currentIndex ? 'bg-accent-dark' : 'bg-gray-regular'}`}
            ></li>
          ))}
        </ul>
        <div className={`${currentIndex === itemsCount - 1 ? 'text-accent-dark' : 'text-gray-regular'}`}>
          {`${itemsCount < 10 ? '0' : ''}${itemsCount}`}
        </div>
      </div>
      <div className='flex gap-8'>
        <button 
          type='button' 
          disabled={currentIndex === 0}
          onClick={showPreviousItem}
        >
          <Image 
            src='/assets/icons/left-arrow.svg'
            alt='previous'
            width={30}
            height={30}
            style={{ 
              filter: currentIndex ===  0 ? DISABLED_ARROW_COLOR : '' 
            }}
          />
        </button>
        <button 
          type='button' 
          disabled={currentIndex === itemsCount - 1}
          onClick={showNextItem}
        >
          <Image
            src='/assets/icons/right-arrow.svg'
            alt='next'
            width={30}
            height={30}
            style={{ 
              filter: currentIndex ===  itemsCount - 1 ? DISABLED_ARROW_COLOR : '' 
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default SliderNavPanel;