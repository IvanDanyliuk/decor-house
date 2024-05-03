import Link from 'next/link';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import CartDetails from '@/components/cart/CartDetails';
import { getCurrentUser } from '@/lib/queries/user.queries';


export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Decor House is a company that sells high-quality furniture and accessories'
}


const Cart = async () => {
  const session = await getServerSession();
  const user = session?.user ? await getCurrentUser(session?.user?.email!) : null;

  return (
    <div className='w-full'>
      <section className='px-3 md:px-0 py-8 w-full bg-main-bg'>
        <p className='container mx-auto mb-4 flex gap-1 text-sm font-semibold capitalize'>
          <Link href='/'>Home</Link>
          <span>/</span>
          <Link href='/catalog'>Catalog</Link>
          <span>/</span>
        </p>
        <h2 className='container mx-auto page-heading-primary'>Cart</h2>
      </section>
      <section className='container mx-auto px-3 md:px-0'>
        <CartDetails user={user} />
      </section>
    </div>
  );
};

export default Cart;