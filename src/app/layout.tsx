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
        <header>Header</header>
        <main>
          {children}
        </main>
        <footer>Footer</footer>
      </body>
    </html>
  )
}
