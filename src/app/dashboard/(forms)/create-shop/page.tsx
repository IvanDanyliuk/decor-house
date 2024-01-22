import ShopForm from '@/components/forms/ShopForm';
import React from 'react';


const CreateShop = () => {
  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>New Manufacturer</h2>
      </section>
      <section className='container mx-auto py-10 box-border'>
        <ShopForm />
      </section>
    </>
  );
};

export default CreateShop;