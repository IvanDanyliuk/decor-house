import { notFound } from 'next/navigation';
import PromotionsTable from '@/components/tables/PromotionsTable';
import Pagination from '@/components/ui/Pagination';
import { getPromotions } from '@/lib/queries/promotion.queries';


const Promotions = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  const { data } = await getPromotions({ page: +page, itemsPerPage: 10 });

  if(!data) {
    notFound();
  }

  return (
    <>
      <PromotionsTable promotions={data.promotions!} />
      <Pagination itemsCount={data.count!} />
    </>
  );
};

export default Promotions;