import Image from 'next/image';
import { Divider } from 'antd';
import dayjs from 'dayjs';
import { IOrder } from '@/lib/types/order.types';
import Accordion from '../ui/Accordion';


interface IOrdersTab {
  orders: IOrder[];
}

const OrderTitle = ({ order }: { order: IOrder }) => (
  <div className='relative flex gap-10 text-sm flex-1'>
    <div>
    <table className='w-auto'>
      <tr>
        <th>Order ID:</th>
        <td className='px-3 font-normal'>{order._id!}</td>
      </tr>
      <tr>
        <th>Date:</th>
        <td className='px-3 font-normal'>{dayjs(order.createdAt!).format('DD.MM.YYYY')}</td>
      </tr>
      <tr>
        <th>Address:</th>
        <td className='px-3 font-normal'>{order.deliveryAddress}</td>
      </tr>
      <tr>
        <th>Status:</th>
        <td className='px-3 font-normal'>{`${order.deliveryStatus} / ${order.paymentStatus}`}</td>
      </tr>
    </table>
    </div>
    <div className='flex justify-between items-center gap-10 flex-1'>
      <p>
        <span>Order Amount: </span>
        <span className='font-normal'>&euro;{order.totalAmount}</span>
      </p>
      <ul className='flex items-center gap-3'>
        {order.products.map(item => (
          <li key={crypto.randomUUID()}>
            <Image src={item.product.images[0]} alt={item.product.name} width={50} height={50} />
          </li>
        )).slice(0, 5)}
        {order.products.length > 5 && <li>{` + ${order.products.length - 5} more`}</li>}
      </ul>
    </div>
  </div>
);


const OrdersTab: React.FC<IOrdersTab> = ({ orders }) => {
  return (
    <ul>
      {orders.map((order, i) => (
        <li key={crypto.randomUUID()}>
          <Accordion title={<OrderTitle order={order} />} >
            <table className='w-full text-sm font-semibold'>
              {order.products.map(item => (
                <tr key={crypto.randomUUID()}>
                  <td className='py-4'>
                    <Image src={item.product.images[0]} alt={item.product.name} width={80} height={80} />
                  </td>
                  <td className='font-semibold'>
                    <span className='font-bold'>{item.product.name} </span>
                    <span>{item.product.type}</span>
                  </td>
                  <td>
                    <span className='text-gray-regular'>Price: </span>
                    <span>&euro;{item.product.price}</span>
                  </td>
                  <td>
                    <span className='text-gray-regular'>Quantity: </span>
                    <span>{item.quantity}</span>
                  </td>
                  <td>
                    <span className='text-gray-regular'>Amount: </span>
                    <span>&euro;{item.product.price * item.quantity}</span>
                  </td>
                </tr>
              ))}
            </table>
          </Accordion>
          {i !== orders.length - 1 && <Divider />}
        </li>
      ))}
    </ul>
  );
};

export default OrdersTab;