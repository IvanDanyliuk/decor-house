'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const Search: React.FC = () => {
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

  const handleSearchValueSubmit = (e: any) => {
    if(e.target.value && e.key === 'Enter') {
      const params = new URLSearchParams(searchParams);
      params.set('query', e.target.value.trim());
      router.push(`/search?${params.toString()}`);
      setIsActive(false);
    }
  }

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
              autoFocus
              onChange={handleSearchValueChange} 
              onKeyDown={handleSearchValueSubmit}
              className='w-full border border-white border-b-gray-regular rounded-none focus:shadow-none' 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;