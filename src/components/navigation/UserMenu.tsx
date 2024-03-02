'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';


interface IUserMenuProps {
  user: {
    _id: string;
    name: string;
    photo: string;
    role: string;
    phone: string;
    productCart: any[];
  };
}


const UserMenu: React.FC<IUserMenuProps> = ({ user }) => {
  if(!user) return null;

  const userItems: MenuProps['items'] = [
    {
      label: <Link href={`/profile/${user._id}`}>Profile</Link>,
      key: '0',
    },
    {
      label: <button onClick={() => {
        localStorage.removeItem('cart');
        localStorage.removeItem('viewed');
        window.dispatchEvent(new Event('storage'));
        signOut();
      }}>Sign Out</button>,
      key: '1',
    },
  ];
  
  const adminItems: MenuProps['items'] = [
    {
      label: <Link href={`/profile/${user._id}`}>Profile</Link>,
      key: '0',
    },
    {
      label: <Link href='/dashboard'>Dashboard</Link>,
      key: '1',
    },
    {
      label: <button onClick={() => {
        localStorage.removeItem('cart');
        localStorage.removeItem('viewed')
        window.dispatchEvent(new Event('storage'));
        signOut();
      }}>Sign Out</button>,
      key: '2',
    },
  ];
  
  return (
    <Dropdown 
      menu={{ items: user.role === 'admin' ? adminItems : userItems }} 
      trigger={['click']}
    >
      <button className='flex items-center gap-1'>
        <Avatar src={user.photo} />
        <span className='hidden md:inline'>{user.name}</span>
      </button>
    </Dropdown>
  );
};

export default UserMenu;