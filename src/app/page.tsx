import Demo from '@/components/homepage/Demo';
import Hero from '@/components/homepage/Hero';
import Interiors from '@/components/homepage/Interiors';
import NewProducts from '@/components/homepage/NewProducts';
import StoreOverview from '@/components/homepage/StoreOverview';
import Section from '@/components/ui/Section';
import { getInteriors } from '@/lib/queries/interior.queries';
import { getProducts } from '@/lib/queries/product.queries';


export default async function Home() {
  const productsData = await getProducts({ page: 1, itemsPerPage: 6 });
  const interiorsData = await getInteriors({ page: 1, itemsPerPage: 6 });

  return (
    <div className='flex flex-col gap-12 md:gap-24'>
      <Section className='relative mx-auto container'>
        <Hero />
      </Section>
      <Section className='w-full'>
        <StoreOverview />
      </Section>
      <Section className='mx-auto container'>
        {productsData.data ? (
          <NewProducts products={productsData.data.products} />
        ) : (
          <div className='w-full h-96'>Loading products...</div>
        )}
      </Section>
      <Section className='w-full'>
        <Demo />
      </Section>
      <Section className='w-full'>
        <Interiors interiors={interiorsData.data.interiors} />
      </Section>
    </div>
  );
};
