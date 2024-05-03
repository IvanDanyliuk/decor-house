import { notFound } from 'next/navigation';
import { getPromotion } from '@/lib/queries/promotion.queries';
import PromotionDetails from '@/components/promotions/PromotionDetails';


export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const promotion = await getPromotion(params.id);
  return {
    title: {
      absolute: promotion.data.title
    },
    description: promotion.data.description
  }
};


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