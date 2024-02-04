import Link from 'next/link';
import { Divider } from 'antd';
import { IProduct } from '@/lib/types/products.types';
import Image from 'next/image';


interface INewProducts {
  products: IProduct[];
}


const NewProducts: React.FC<INewProducts> = async ({ products }) => {
  console.log('NEW PRODUCTS', products)

  return (
    <div>
      <div className='w-full flex justify-between items-center'>
        <h3 className='pb-6 text-5xl font-semibold'>
          New <span className='font-bold uppercase'>Products</span>
        </h3>
        <Link href='/catalog' className='flex items-center gap-3'>
          <span className='text-semibold'>All new items</span>
          <Image
            src='/assets/icons/right-arrow.svg'
            alt='next'
            width={30}
            height={30}
          />
        </Link>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default NewProducts;