import type { Metadata } from 'next';
import Link from 'next/link';
import { Divider } from 'antd';
import { Montserrat } from 'next/font/google';
import './globals.scss'
import { ShoppingCartOutlined } from '@ant-design/icons';
import NavMenu from '../../components/layout/NavMenu';
import Search from '../../components/layout/Search';
import ContactLinks from '../../components/ui/ContactLinks';


const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Decor House',
  description: 'Decor House: your guide for making interiors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const year = new Date().getFullYear();

  return (
    <html lang='en'>
      <body className={montserrat.className}>
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
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className='w-full py-10 flex flex-col justify-center items-center bg-main-bg'>
          <div className='relative w-full container'>
            <div className='text-3xl font-bold text-accent-dark text-center'>Decor House</div>
            <Divider className='my-8 w-20' />
            <div className='w-full flex justify-between'>
              <div className='text-sm text-gray-dark'>
                {`Decor House Group. ${year}`}
              </div>
              <ul className='flex gap-8 text-sm text-gray-dark font-semibold'>
                <li>
                  <Link href='/about'>About Company</Link>
                </li>
                <li>
                  <Link href='/legal'>Legal Information</Link>
                </li>
                <li>
                  <Link href='/privacy'>Privacy Policy</Link>
                </li>
              </ul>
              <ContactLinks />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
};
