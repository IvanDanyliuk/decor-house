import ManufacturerForm from '@/components/forms/ManufacturerForm';


const CreateManufacturer = () => {
  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>New Manufacturer</h2>
      </section>
      <section className='px-3 md:px-0 container mx-auto py-3 md:py-10 box-border'>
        <ManufacturerForm />
      </section>
    </>
  );
};

export default CreateManufacturer;