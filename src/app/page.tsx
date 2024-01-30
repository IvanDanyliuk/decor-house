import Hero from '@/components/homepage/Hero';
import StoreOverview from '@/components/homepage/StoreOverview';
import Section from '@/components/ui/Section';


export default function Home() {
  return (
    <div className='flex flex-col gap-12 md:gap-24'>
      <Section className='relative mx-auto container'>
        <Hero />
      </Section>
      <Section className='w-full'>
        <StoreOverview />
      </Section>
    </div>
  );
};
