import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Loader from '@/components/ui/Loader';
import { getLocations } from '@/lib/queries/shop.queries';


const ShopsView = dynamic(() => import('../../components/shops/ShopsView'), {
  loading: () => <Loader />,
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Shops',
  description: 'Decor House is a company that sells high-quality furniture and accessories'
}


const Shops = async () => {
  const locations = await getLocations();

  return (
    <div className='relative w-full'>
      <section className='py-8 w-full bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary text-center'>
          Shops
        </h2>
      </section>
      <section className='w-full'>
        <ShopsView countries={locations} />
      </section>
    </div>
  );
};

export default Shops;