import PromotionsTable from '@/components/tables/PromotionsTable';
import Pagination from '@/components/ui/Pagination';
import { getPromotions } from '@/lib/queries/promotion.queries';
import React from 'react';


const Promotions = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  const { data } = await getPromotions({ page: +page, itemsPerPage: 10 });

  return (
    <>
      {data ? (
        <>
          <PromotionsTable promotions={data.promotions!} />
          <Pagination itemsCount={data.count!} />
        </>
      ) : (
        <div>Promotions not found</div>
      )}
    </>
  );
};

export default Promotions;