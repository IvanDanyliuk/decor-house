'use client';

import { useState, useEffect } from 'react';
import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';


const menuItems: MenuProps['items'] = [
  {
    label: 'Products',
    key: 'products',
  },
  {
    label: 'Categories',
    key: 'categories',
  },
  {
    label: 'Users',
    key: 'users',
  },
  {
    label: 'Manufacturers',
    key: 'manufacturers',
  },
  {
    label: 'Interiors',
    key: 'interiors',
  },
  {
    label: 'Promotions',
    key: 'promotions',
  },
  {
    label: 'Shops',
    key: 'shops',
  },
  {
    label: 'Posts',
    key: 'posts',
  },
];


const DashboardMenu = () => {
  const [currentLink, setCurrentLink] = useState('products');

  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('CURRENT LINK', e);
    setCurrentLink(e.key);
  };

  useEffect(() => {
    router.push(`/dashboard/${currentLink}`);
  }, [currentLink]);

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