'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Divider, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import ContactLinks from '../ui/ContactLinks';
import { usePathname } from 'next/navigation';


const menuLinks = {
  main: [
    { path: '/', title: 'Home' },
    { path: '/catalog', title: 'Catalog' },
    { path: '/interiors', title: 'Interiors' },
    { path: '/promotions', title: 'Promotions' },
    { path: '/shops', title: 'Shops' },
    { path: '/blog', title: 'Blog' },
  ],
  secondary: [
    { path: '/login', title: 'Login' },
    { path: '/profile/:id', title: 'Profile' },
    { path: '/dashboard', title: 'Dashboard' },
  ],
  additional: [
    { path: '/about', title: 'About Company' },
    { path: '/legal-info', title: 'Legal Information' },
    { path: '/privacy', title: 'Privacy Policy' },
  ],
};


const NavMenu: React.FC = () => {
  const [isOpen,setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleDrawerOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
            {menuLinks.main.map(link => (
              <motion.li 
                key={crypto.randomUUID()}
                whileHover={{ scale: 1.1 }}
              >
                <Link href={link.path} className='hover:text-gray-dark'>
                  {link.title}
                </Link>
              </motion.li>
            ))}
          </ul>
          <Divider />
          <ul className='main-nav-link-group'>
            {menuLinks.secondary.map(link => (
              <motion.li 
                key={crypto.randomUUID()}
                whileHover={{ scale: 1.1 }}
              >
                <Link href={link.path} className='hover:text-gray-dark'>
                  {link.title}
                </Link>
              </motion.li>
            ))}
          </ul>
          <Divider />
          <ul className='secondary-nav-link-group'>
            {menuLinks.additional.map(link => (
              <motion.li 
                key={crypto.randomUUID()}
                whileHover={{ scale: 1.1 }}
              >
                <Link href={link.path} className='hover:text-gray-dark'>
                  {link.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
        <ContactLinks />
      </Drawer>
    </>
  );
};

export default NavMenu;