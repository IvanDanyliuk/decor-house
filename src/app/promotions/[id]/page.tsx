import { notFound } from 'next/navigation';
import { getPromotion } from '@/lib/queries/promotion.queries';
import PromotionDetails from '@/components/promotions/PromotionDetails';


const Promotion = async ({ params }: { params: { id: string } }) => {
  const { data } = await getPromotion(params.id);

  if(!data) {
    notFound();
  }

  return (
    <PromotionDetails promotion={data} />
  );
};

export default Promotion;