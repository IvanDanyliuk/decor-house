import React from 'react';
import Link from 'next/link';
import { ShoppingCartOutlined } from '@ant-design/icons';
import NavMenu from './NavMenu';
import Search from './Search';
import AuthButton from './AuthButton';


const Header: React.FC = () => {
  return (
    <header className='w-full h-24 flex items-center'>
      <div className='container mx-auto flex justify-between'>
        <div className='flex items-center gap-6'>
          <NavMenu />
          <div className='text-2xl font-bold text-accent-dark'>Decor House</div>
        </div>
        <div className='flex items-center gap-6'>
          <Search />
          <Link href='/cart' className='flex items-center gap-1'>
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
            <span>{`(${3})`}</span>
          </Link>
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

export default Header;