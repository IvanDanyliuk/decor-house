'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Drawer, Menu, MenuProps } from 'antd';
import { usePathname } from 'next/navigation';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import { ProfileOutlined } from '@ant-design/icons';


const menuData = [
  {
    label: <Link href='/dashboard'>Stats</Link>,
    key: 'statistics',
  },
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
    label: <Link href='/dashboard/orders'>Orders</Link>,
    key: 'orders',
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

const menuItems: MenuProps['items'] = [...menuData];


const DashboardMenu = () => {
  const [currentLink, setCurrentLink] = useState('statistics');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const { width } = useWindowSize();

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentLink(e.key);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const url = pathname.split('/');

    if(url[2] && currentLink !== url[2]) {
      setCurrentLink(url[2]);
    }
  }, [pathname]);

  return (
    <>
      {width && width >= 640 ? (
        <Menu 
          onClick={onClick} 
          selectedKeys={[currentLink]} 
          mode='horizontal' 
          items={menuItems}
        />
      ) : (
        <div className='w-full flex justify-end itens-center'>
          <button onClick={() => setIsMenuOpen(true)}>
            <ProfileOutlined className='text-3xl' />
          </button>
          <Drawer
            open={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          >
            <ul className='flex flex-col gap-3'>
              {menuData.map(item => (
                <li key={crypto.randomUUID()} className='text-lg font-semibold'>
                  {item.label}
                </li>
              ))}
            </ul>
          </Drawer>
        </div>
      )}
    </>
  );
};

export default DashboardMenu;