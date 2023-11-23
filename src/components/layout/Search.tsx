'use client'

import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const Search: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleActiveMode = () => { 
    setIsActive(!isActive) 
  };

  return (
    <div className='h-full flex'>
      {isActive && (
        <Input />
      )}
      <button className='flex items-center' onClick={handleActiveMode}>
        <SearchOutlined style={{ fontSize: '20px' }} />
      </button>
    </div>
  )
}

export default Search