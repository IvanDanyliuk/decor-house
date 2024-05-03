import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getCurrentUser } from '@/lib/queries/user.queries';
import OrderDetails from '@/components/order/OrderDetails';


export const metadata: Metadata = {
  title: 'Checkout | Decor House',
  description: 'Decor House is a company that sells high-quality furniture and accessories'
}


const Order = async () => {
  const session = await getServerSession();
  const user = session?.user ? await getCurrentUser(session.user.email!) : null;

  return (
    <div className='w-full'>
      <section className='py-8 w-full bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary text-center'>Checkout</h2>
      </section>
      <section className='container mx-auto'>
        <OrderDetails user={user} />
      </section>
    </div>
  );
};

export default Order;