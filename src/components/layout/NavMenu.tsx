'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Divider, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import ContactLinks from '../ui/ContactLinks';


const NavMenu: React.FC = () => {
  const [isOpen,setIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className='flex items-center' onClick={handleDrawerOpen}>
        <MenuOutlined style={{ fontSize: '20px' }} />
      </button>
      <Drawer
        placement='left'
        closable={true}
        open={isOpen}
        onClose={handleDrawerOpen}
        key='left'
        styles={{
          header: {
            borderBottom: 'none',
          },
          body: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 30,
          }
        }}
      >
        <div>
          <ul className='main-nav-link-group'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/'>Catalog</Link>
            </li>
            <li>
              <Link href='/'>Interiors</Link>
            </li>
            <li>
              <Link href='/'>Promotions</Link>
            </li>
            <li>
              <Link href='/'>Shops</Link>
            </li>
            <li>
              <Link href='/'>Blog</Link>
            </li>
          </ul>
          <Divider />
          <ul className='main-nav-link-group'>
            <li>
              <Link href='/'>Login</Link>
            </li>
            <li>
              <Link href='/'>Profile</Link>
            </li>
            <li>
              <Link href='/'>Dashboard</Link>
            </li>
          </ul>
          <Divider />
          <ul className='secondary-nav-link-group'>
            <li>
              <Link href='/'>About Company</Link>
            </li>
            <li>
              <Link href='/'>Legal Information</Link>
            </li>
            <li>
              <Link href='/'>Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <ContactLinks />
      </Drawer>
    </>
  );
};

export default NavMenu;