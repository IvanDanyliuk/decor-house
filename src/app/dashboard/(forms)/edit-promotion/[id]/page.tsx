import PromotionForm from '@/components/forms/PromotionForm';
import { getPromotion } from '@/lib/queries/promotion.queries';


const UpdatePromotion = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data } = await getPromotion(id);

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>Update Promotion</h2>
      </section>
      <section className='px-3 md:px-0 container mx-auto py-3 md:py-10 box-border'>
        {data && (
          <PromotionForm promotionToUpdate={data} />
        )}
      </section>
    </>
  );
};

export default UpdatePromotion;