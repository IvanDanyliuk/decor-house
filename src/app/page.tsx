import Hero from '@/components/homepage/Hero';
import NewProducts from '@/components/homepage/NewProducts';
import StoreOverview from '@/components/homepage/StoreOverview';
import Section from '@/components/ui/Section';
import { getProducts } from '@/lib/queries/product.queries';


export default async function Home() {
  const { data } = await getProducts({ page: 1, itemsPerPage: 10 });

  return (
    <div className='flex flex-col gap-12 md:gap-24'>
      <Section className='relative mx-auto container'>
        <Hero />
      </Section>
      <Section className='w-full'>
        <StoreOverview />
      </Section>
      <Section className='mx-auto container'>
        <NewProducts products={data.products} />
      </Section>
    </div>
  );
};
