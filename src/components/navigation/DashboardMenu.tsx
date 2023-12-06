'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, MenuProps } from 'antd';


const menuItems: MenuProps['items'] = [
  {
    label: <Link href='/dashboard/products'>Products</Link>,
    key: 'products',
  },
  {
    label: <Link href='/dashboard/categories'>Categories</Link>,
    key: 'categories',
  },
  {
    label: <Link href='/dashboard/users'>Users</Link>,
    key: 'users',
  },
  {
    label: <Link href='/dashboard/manufacturers'>Manufacturers</Link>,
    key: 'manufacturers',
  },
  {
    label: <Link href='/dashboard/interiors'>Interiors</Link>,
    key: 'interiors',
  },
  {
    label: <Link href='/dashboard/promotions'>Promotions</Link>,
    key: 'promotions',
  },
  {
    label: <Link href='/dashboard/shops'>Shops</Link>,
    key: 'shops',
  },
  {
    label: <Link href='/dashboard/posts'>Posts</Link>,
    key: 'posts',
  },
];


const DashboardMenu = () => {
  const [currentLink, setCurrentLink] = useState('products');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentLink(e.key);
  };

  return (
    <Menu 
      onClick={onClick} 
      selectedKeys={[currentLink]} 
      mode='horizontal' 
      items={menuItems} 
    />
  );
};

export default DashboardMenu;