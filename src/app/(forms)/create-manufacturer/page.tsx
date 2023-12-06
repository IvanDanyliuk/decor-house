import ManufacturerForm from '@/components/forms/ManufacturerForm';
import React from 'react';


const CreateManufacturer: React.FC = () => {
  return (
    <div>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>New Manufacturer</h2>
      </section>
      <section className='container mx-auto py-10 box-border'>
        <ManufacturerForm />
      </section>
    </div>
  );
};

export default CreateManufacturer;