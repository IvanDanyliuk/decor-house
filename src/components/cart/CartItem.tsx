import Image from 'next/image';
import { ICartItem } from '@/lib/types/user.types';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';


interface ICartItemProps {
  data: ICartItem;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onDeleteItem: (id: string) => void;
}


const CartItem: React.FC<ICartItemProps> = ({ data, onIncreaseQuantity, onDecreaseQuantity, onDeleteItem }) => {
  return (
    <li 
      key={crypto.randomUUID()} 
      className='relative my-10 w-full flex md:items-center gap-6 md:gap-12 font-semibold'
    >
      <Image 
        src={data.product.images[0]} 
        alt={data.product.name} 
        width={130} 
        height={130} 
      />
      <div className='relative flex flex-col md:flex-row flex-1 justify-between md:items-center gap-6'>
        <div className='w-full md:w-7/12 flex flex-col md:flex-row md:items-center gap-1 md:gap-3'>
          <p>
            {data.product.name}
          </p>
          <p className='text-sm text-gray-dark'>
            {data.product.type}
          </p>
        </div>
        <div className='flex gap-6 w-full md:w-auto md:flex-1 justify-between items-center'>
          <p className='text-lg font-bold'>
            &euro;<span>{data.product.price}</span>
          </p>
          <div className='flex md:gap-6 border md:border-none border-accent-dark rounded'>
            <button 
              type='button' 
              onClick={() => onDecreaseQuantity(data.product._id!)}
              className='px-2 py-1 border-r md:border-none border-accent-dark'
            >
              <MinusOutlined />
            </button>
            <p className='px-3 py-1'>
              {data.quantity}
            </p>
            <button 
              type='button' 
              onClick={() => onIncreaseQuantity(data.product._id!)}
              className='px-2 py-1 border-l md:border-none border-accent-dark'
            >
              <PlusOutlined />
            </button>
          </div>
          <p className='text-lg font-bold'>
            &euro;<span>{data.product.price * data.quantity}</span>
          </p>
        </div>
        <button 
          type='button' 
          onClick={() => onDeleteItem(data.product._id!)} 
          className='absolute top-0 right-0 md:relative px-3 py-2 text-lg bg-main-bg md:bg-white'
        >
          <DeleteOutlined />
        </button>
      </div>
    </li>
  );
};

export default CartItem;