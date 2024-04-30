'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link';
import { Badge, Drawer } from 'antd';
import { HomeOutlined, MoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import SearchMobile from '../layout/SearchMobile';
import { useWindowSize } from '@/utils/hooks/use-window-size';


const BottomNavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartSize, setCartSize] = useState<number>(0);

  const { width } = useWindowSize();

  const handleMenuOpen = () => {
    setIsOpen(prev => !prev);
  };

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

  if(width && width > 640) {
    return null;
  }

  return (
    <>
      <button 
        onClick={handleMenuOpen} 
        className='fixed right-5 bottom-5 w-14 h-14 flex justify-center items-center bg-accent-dark text-2xl text-white rounded-full shadow-lg'
      >
        <MoreOutlined />
      </button>
      <Drawer
        open={isOpen} 
        closable={true}
        placement='bottom'
        onClose={handleMenuOpen}
        height={'6rem'}
        styles={{
          header: {
            display: 'none',
          },
          body: {
            height: '5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#000000',
            color: '#ffffff'
          }
        }}
      >
        <Link href='/cart' onClick={handleMenuOpen}>
          <Badge count={cartSize} color='#F1F5FA' style={{ color: '#000000' }}>
            <ShoppingCartOutlined className='text-3xl text-white' />
          </Badge>
        </Link>
        <Link href='/' onClick={handleMenuOpen} className='text-3xl'>
          <HomeOutlined />
        </Link>
        <SearchMobile onClick={handleMenuOpen} />
      </Drawer>
    </>
  );
};

export default BottomNavigationBar;