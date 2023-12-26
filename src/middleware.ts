import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';


export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/dashboard') && req.nextauth.token?.role !== 'admin') {
      return NextResponse.rewrite(new URL('/dashboard', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === 'admin',
    },
  },
);

export const config = { matcher: [
  '/dashboard', '/dashboard/:path*', '/profile', '/profile/:path*', '/orders', '/orders/:path*'
] };