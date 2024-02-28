import { IOrder } from "@/lib/types/order.types"

interface IOrdersTab {
  orders: IOrder[];
}

const OrdersTab: React.FC<IOrdersTab> = ({ orders }) => {
  return (
    <div>{orders.length}</div>
  );
};

export default OrdersTab;