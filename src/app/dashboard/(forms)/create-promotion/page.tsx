import PromotionForm from '@/components/forms/PromotionForm';
import React from 'react';


const CreatePromotion: React.FC = () => {
  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>New Promotion</h2>
      </section>
      <section className='container mx-auto py-10 flex-1 box-border'>
        <PromotionForm />
      </section>
    </>
  );
};

export default CreatePromotion;