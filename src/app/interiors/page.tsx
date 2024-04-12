import InteriorsView from '@/components/interiors/InteriorsView';


const Interiors = () => {
  return (
    <div className='relative w-full'>
      <section className='py-8 w-full bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary text-center'>
          Interiors
        </h2>
      </section>
      <section className='container mx-auto px-3 md:px-0'>
        <InteriorsView />
      </section>
    </div>
  );
};

export default Interiors;