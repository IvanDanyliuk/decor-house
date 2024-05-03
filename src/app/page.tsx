import type { Metadata } from 'next';
import Demo from '@/components/homepage/Demo';
import Hero from '@/components/homepage/Hero';
import Interiors from '@/components/homepage/Interiors';
import NewProducts from '@/components/homepage/NewProducts';
import StoreOverview from '@/components/homepage/StoreOverview';
import Section from '@/components/ui/Section';
import { getInteriors } from '@/lib/queries/interior.queries';
import { getProducts } from '@/lib/queries/product.queries';


export const metadata: Metadata = {
  title: 'Decor House',
  description: 'Decor House is a company that sells high-quality furniture and accessories'
}


export default async function Home() {
  const productsData = await getProducts({ page: 1, itemsPerPage: 6 });
  const interiorsData = await getInteriors({ page: 1, itemsPerPage: 6 });

  return (
    <div className='flex flex-col gap-12 md:gap-24'>
      <Section className='relative mx-auto px-3 md:px-0 container'>
        <Hero />
      </Section>
      <Section className='w-full'>
        <StoreOverview />
      </Section>
      <Section className='mx-auto px-3 md:px-0 container'>
        {productsData.data.products ? (
          <NewProducts products={productsData.data.products} />
        ) : (
          <div className='w-full h-96'>Products not found</div>
        )}
      </Section>
      <Section className='w-full'>
        <Demo />
      </Section>
      <Section className='w-full px-3 md:px-0'>
        <Interiors interiors={interiorsData.data.interiors} />
      </Section>
    </div>
  );
};
