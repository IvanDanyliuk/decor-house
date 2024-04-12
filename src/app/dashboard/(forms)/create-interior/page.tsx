import InteriorForm from '@/components/forms/InteriorForm';
import { getCategories } from '@/lib/queries/category.queries';
import React from 'react';


const CreateInterior: React.FC = async () => {
  const categories = await getCategories({});

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>New Interior</h2>
      </section>
      <section className='px-3 md:px-0 container mx-auto py-3 md:py-10 flex-1 box-border'>
        <InteriorForm categories={categories.data.categories} />
      </section>
    </>
  );
};

export default CreateInterior;