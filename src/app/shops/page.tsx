import { getLocations } from '@/lib/queries/shop.queries';
import dynamic from 'next/dynamic';

const ShopsView = dynamic(() => import('../../components/shops/ShopsView'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});


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