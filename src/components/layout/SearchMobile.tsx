'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


interface ISearchMobile {
  onClick: () => void;
}

const SearchMobile: React.FC<ISearchMobile> = ({ onClick }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleActiveMode = () => { 
    if(!isActive) {
      onClick();
    }
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
    <div>
      <button type='button' onClick={handleActiveMode} className='text-3xl'>
        <SearchOutlined />
      </button>
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
            onKeyDown={handleSearchValueSubmit}
            className='w-full border border-white border-b-gray-regular rounded-none' 
          />
          <button onClick={handleActiveMode}>
            <SearchOutlined style={{ fontSize: '20px' }} />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SearchMobile;