import './globals.scss';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Divider } from 'antd';
import { Montserrat } from 'next/font/google';
import ContactLinks from '../components/ui/ContactLinks';
import SessionProvider from '../components/SessionProvider';
import Header from '../components/layout/Header';


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
        <SessionProvider session={session}>
          <Header />
          <main>
            {children}
          </main>
          <footer className='w-full py-10 flex flex-col justify-center items-center bg-main-bg'>
            <div className='relative w-full container'>
              <div className='text-xl md:text-3xl font-bold text-accent-dark text-center'>Decor House</div>
              <Divider className='py-1 md:py-4 md:my-8' />
              <div className='w-full flex flex-col md:flex-row md:justify-between items-center gap-6'>
                <div className='text-sm text-gray-dark'>
                  {`Decor House Group. ${year}`}
                </div>
                <ul className='flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-gray-dark font-semibold'>
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
        </SessionProvider>
      </body>
    </html>
  );
};
