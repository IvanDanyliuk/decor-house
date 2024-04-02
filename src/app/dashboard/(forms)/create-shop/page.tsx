import ShopForm from '@/components/forms/ShopForm';


const CreateShop = () => {
  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>New Shop</h2>
      </section>
      <section className='container mx-auto py-3 md:py-10 box-border'>
        <ShopForm />
      </section>
    </>
  );
};

export default CreateShop;