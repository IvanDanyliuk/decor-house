'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link';
import { Badge } from 'antd';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import SearchMobile from '../layout/SearchMobile';


const BottomNavigationBar: React.FC = () => {
  const [cartSize, setCartSize] = useState<number>(0);

  useEffect(() => {
    const handleStorageChange = () => {
      const cartString = localStorage.getItem('cart');
      if(cartString) {
        const cartData = JSON.parse(cartString);
        setCartSize(cartData.length)
      } else {
        setCartSize(0);
      }
    };

    const cartString = localStorage.getItem('cart') || '[]';
    const size = JSON.parse(cartString);
    setCartSize(size.length);

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className='fixed bottom-0 px-6 w-full h-20 md:hidden flex justify-between items-center bg-accent-dark text-white z-30'>
      <Link href='/cart'>
        <Badge count={cartSize} color='#F1F5FA' style={{ color: '#000000' }}>
          <ShoppingCartOutlined className='text-3xl text-white' />
        </Badge>
      </Link>
      <Link href='/' className='text-3xl'>
        <HomeOutlined />
      </Link>
      <SearchMobile />
    </div>
  );
};

export default BottomNavigationBar;