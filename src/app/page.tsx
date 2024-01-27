import StoreOverview from '@/components/homepage/StoreOverview';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col gap-24'>
      <section className='relative mx-auto container hero object-fill'>
        <img src='./assets/images/SOFA.png' />
        <div className='absolute w-full h-full flex'>
          <div className='relative hero-item'>
            <div className='absolute pt-6 bottom-0 bg-white'>
              <h1 className='page-heading-primary text-center'>Decor House</h1>
              <p className='py-6'>
                We are design pioneers in the online world. Ever since we have grown continually into a medium-sized enterprise. The proud number of over 400,000 satisfied customers agrees with our pioneer work. 
              </p>
              <Link href='/catalog' className='py-3 link-primary'>Catalog</Link>
            </div>
          </div>
          <div className='hero-divider' />
          <div className='hero-item'></div>
          <div className='hero-divider' />
          <div className='hero-item'></div>
        </div>
      </section>
      <section className='w-full'>
        <StoreOverview />
      </section>
    </div>
  );
}
;