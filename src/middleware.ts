import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';


export default withAuth(
  function middleware(req) {
    if(req.nextUrl.pathname.startsWith('/dashboard') && req.nextauth.token?.role !== 'admin') {
      return NextResponse.rewrite(new URL('/login', req.url));
    }
    if(req.nextUrl.pathname.startsWith('/profile/*') && req.nextauth.token) {
      return NextResponse.rewrite(new URL('/login', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = { matcher: [
  '/dashboard', '/dashboard/:path*', '/profile', '/profile/:path*', '/orders', '/orders/:path*'
] };