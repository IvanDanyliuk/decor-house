import type { Metadata } from 'next';
import PromotionsView from '@/components/promotions/PromotionsView';


export const metadata: Metadata = {
  title: 'Promotions',
  description: 'Check out the current promotions in Decor House stores'
}


const Promotions = () => {
  return (
    <div className='relative w-full'>
      <section className='py-8 w-full bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary text-center'>
          Promotions
        </h2>
      </section>
      <section>
        <PromotionsView />
      </section>
    </div>
  );
};

export default Promotions;