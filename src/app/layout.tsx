import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

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
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <header className='w-full h-24 flex items-center'>
          <div className='container mx-auto flex justify-between'>
            <div>menu and logo</div>
            <div>search, cart, and user menu</div>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer>Footer</footer>
      </body>
    </html>
  )
}
