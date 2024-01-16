import PromotionsTable from '@/components/tables/PromotionsTable';
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
    <PromotionsTable promotions={data.promotions!} />
  );
};

export default Promotions;