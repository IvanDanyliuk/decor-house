import Link from 'next/link';
import { getPromotion } from '@/lib/queries/promotion.queries';
import PromotionDetails from '@/components/promotions/PromotionDetails';


const Promotion = async ({ params }: { params: { id: string } }) => {
  const promotion = await getPromotion(params.id);

  return (
    <>
      {promotion ? (
        <PromotionDetails promotion={promotion.data} />
      ) : (
        <div>
          <p>
            {promotion.error ? promotion.error : 'Cannot find this promotion'}
          </p>
          <Link href='/promotions' className='link-primary'>Go Back</Link>
        </div>
      )}
    </>
  );
};

export default Promotion;