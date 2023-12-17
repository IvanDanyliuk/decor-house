export { default } from 'next-auth/middleware';

export const config = { matcher: [
  '/dashboard', '/dashboard/:path*', '/create-category', '/create-interior', '/create-manufacturer', '/create-post', 
  '/create-product', '/create-promotion', '/create-shop', '/edit-category', '/edit-interior', '/edit-manufacturer', 
  '/edit-post', '/edit-product', '/edit-promotion', '/edit-shop'
] };