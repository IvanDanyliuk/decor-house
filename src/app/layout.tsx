import './globals.scss';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Divider } from 'antd';
import { Montserrat } from 'next/font/google';
import ContactLinks from '../components/ui/ContactLinks';
import SessionProvider from '../components/SessionProvider';
import Header from '../components/layout/Header';
import BottomNavigationBar from '@/components/navigation/BottomNavigationBar';


const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Decor House',
  description: 'Decor House: your guide for making interiors',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const year = new Date().getFullYear();
  const session = await getServerSession();

  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <h1>Hello world!</h1>
      </body>
    </html>
  );
};
