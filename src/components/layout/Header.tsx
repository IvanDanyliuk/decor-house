'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { LoginOutlined, LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import NavMenu from './NavMenu';
import Search from './Search';


const Header: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState<string | null>();

  const fetchUser = async (email: string) => {
    const { data } = await axios.get('/api/user', { params: { email } });
    return data;
  }

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  useEffect(() => {
    try {
      const user = fetchUser(session?.user?.email!);
      setCurrentUser(user);
    } catch (error: any) {
      console.log('HEADER_ERROR', error)
    }
  }, []);

  return (
    <header className='w-full h-24 flex items-center'>
      <div className='container mx-auto flex justify-between'>
        <div className='flex items-center gap-6'>
          <NavMenu />
          <Link href='/' className='text-2xl font-bold text-accent-dark'>Decor House</Link>
        </div>
        <div className='flex items-center gap-6'>
          <Search />
          <Link href='/cart' className='flex items-center gap-1'>
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
            <span>{`(${3})`}</span>
          </Link>
          {
            session?.user?.name ? (
              <button onClick={handleSignOut} className='flex gap-1'>
                <LogoutOutlined />
                <span className='text-sm'>Sign Out</span>
              </button>
            ) : (
              <Link href='/login' className='flex gap-1'>
                <LoginOutlined />
                <span className='text-sm'>Sign In</span>
              </Link>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;