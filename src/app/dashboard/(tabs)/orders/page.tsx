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

  return (
    <>
      {data ? (
        <>
          <OrdersTable orders={data.orders} />
          <Pagination itemsCount={data.count} />
        </>
      ) : (
        <div>Orders not found</div>
      )}
    </>
  );
};

export default Orders;