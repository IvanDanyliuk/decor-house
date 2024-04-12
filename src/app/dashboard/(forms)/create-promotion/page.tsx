import PromotionForm from '@/components/forms/PromotionForm';


const CreatePromotion: React.FC = () => {
  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>New Promotion</h2>
      </section>
      <section className='px-3 md:px-0 container mx-auto py-3 md:py-10 flex-1 box-border'>
        <PromotionForm />
      </section>
    </>
  );
};

export default CreatePromotion;