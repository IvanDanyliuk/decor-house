import { notFound } from 'next/navigation';
import ShopsTable from '@/components/tables/ShopsTable';
import Pagination from '@/components/ui/Pagination';
import { getShops } from '@/lib/queries/shop.queries';


const Shops = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  const { data } = await getShops({ page: +page, itemsPerPage: 10 });

  if(!data) {
    notFound();
  }

  return (
    <>
      <ShopsTable shops={data.shops} />
      <Pagination itemsCount={data.count} />
    </>
  );
};

export default Shops;