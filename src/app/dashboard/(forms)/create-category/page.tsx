import CategoryForm from '@/components/forms/CategoryForm';
import React from 'react';


const CreateCategory: React.FC = () => {
  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>New Category</h2>
      </section>
      <section className='container mx-auto py-10 flex-1 box-border'>
        <CategoryForm />
      </section>
    </>
  );
};

export default CreateCategory;