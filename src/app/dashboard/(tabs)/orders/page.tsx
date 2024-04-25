import { notFound } from 'next/navigation';
import OrdersTable from '@/components/tables/OrdersTable';
import Pagination from '@/components/ui/Pagination';
import { getOrders } from '@/lib/queries/order.queries';


const Orders = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page = +(searchParams.page!) || 1;
  const { data } = await getOrders({ page, itemsPerPage: 10 });

  if(!data) {
    notFound();
  }

  return (
    <>
      <OrdersTable orders={data.orders} />
      <Pagination itemsCount={data.count} />
    </>
  );
};

export default Orders;