import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Divider } from 'antd';
import { Montserrat } from 'next/font/google';
import './globals.scss';
import ContactLinks from '../../components/ui/ContactLinks';
import SessionProvider from '../../components/SessionProvider';
import Header from '../../components/layout/Header';


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

  console.log('Current Session', session)

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
        </SessionProvider>
      </body>
    </html>
  );
};
