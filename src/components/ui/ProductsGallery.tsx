import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Divider } from 'antd';
import { IProduct } from '@/lib/types/products.types';
import { setUrlString } from '@/utils/helpers';


interface IProductGallery {
  products: IProduct[];
  currentItemIndex: number;
  productsToShow: number;
}


const ProductsGallery: React.FC<IProductGallery> = ({ products, currentItemIndex, productsToShow }) => {
  console.log('PRODUCT GALLERY', products)
  return (
    <div className='mb-8 md:mb-16 w-full flex gap-10'>
      {products.slice(currentItemIndex, currentItemIndex + productsToShow).map(product => (
        <Link 
          key={crypto.randomUUID()}
          href={`/catalog/${typeof product.category !== 'string' && setUrlString(product.category.name)}/${product._id}`} 
          className='w-full md:w-1/3'
        >
          <AnimatePresence>
            <motion.div 
              className='relative w-full bg-white'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className='w-full min-h-max flex justify-center items-center'>
                <Image 
                  src={product.images[0]} 
                  alt={product.name} 
                  width={350} 
                  height={350} 
                />
              </div>
              <div className='mt-6 text-center text-lg font-bold'>
                {product.name}
              </div>
              <Divider className='my-6' />
              <div className='text-center text-2xl font-bold'>
                &euro;{product.price}
              </div>
            </motion.div>
          </AnimatePresence>
        </Link>
      ))}
    </div>
  );
};

export default ProductsGallery;