'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useWindowSize } from '@/utils/hooks/use-window-size';


const Search: React.FC = () => {
  const { width } = useWindowSize();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleActiveMode = () => { 
    if(isActive && searchValue) {
      const params = new URLSearchParams(searchParams);
      params.set('query', searchValue.trim());
      router.push(`/search?${params.toString()}`);
      setIsActive(false);
    } else {
      setIsActive(!isActive);
    }
  };

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setSearchValue('');
  }, [isActive]);

  return (
    <div className='relative flex flex-1 flex-row-reverse items-cente'>
      <button 
        className='w-8 h-auto flex justify-center items-center bg-white z-10' 
        onClick={handleActiveMode}
      >
        <SearchOutlined style={{ fontSize: '20px' }} />
      </button>
      {width && width >= 640 ? (
        <AnimatePresence 
          initial={false} 
          onExitComplete={() => setIsActive(false)}
        >
          {isActive && (
            <motion.div 
              key='content' 
              initial='collapsed' 
              animate='open' 
              exit='collapsed' 
              variants={{
                open: { width: '100%' },
                collapsed: { width: 0 } 
              }}
              transition={{
                duration: 0.5,
                ease: [0.04, 0.6, 0.23, 0.98]
              }}
              className='relative'
            >
              <Input 
                value={searchValue} 
                placeholder='Search...' 
                onChange={handleSearchValueChange} 
                className='w-full border border-white border-b-gray-regular rounded-none' 
              />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <Modal
          open={isActive}
          centered
          closable
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          onCancel={() => setIsActive(false)}
        >
          <div className='mt-6 w-full flex'>
            <Input 
              value={searchValue} 
              placeholder='Search...' 
              onChange={handleSearchValueChange} 
              className='w-full border border-white border-b-gray-regular rounded-none' 
            />
            <button onClick={handleActiveMode}>
              <SearchOutlined style={{ fontSize: '20px' }} />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Search;