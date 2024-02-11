'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Divider } from 'antd';
import { getProducts } from '@/lib/queries/product.queries';
import { IProduct } from '@/lib/types/products.types';
import Link from 'next/link';


const CategoryProducts = ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const path= usePathname();
  const modifiedPath = path.slice(1).replaceAll('/', ' / ');

  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsCount, setProductsCount] = useState<number>(0);

  const fetchProducts = () => {
    getProducts({ page, itemsPerPage: 12, category }).then(res => {
      setProducts([...products, ...res.data.products]);
      setProductsCount(res.data.count);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className='w-full'>
      <section className='w-full py-6 bg-main-bg'>
        <p className='container mx-auto mb-3 text-sm font-semibold capitalize'>
          {modifiedPath}
        </p>
        <h2 className='container mx-auto page-heading-primary'>
          {category.replaceAll('-', ' ')}
        </h2>
      </section>
      <section className='relative w-full container mx-auto py-6 box-border'>
        <ul className='w-full grid grid-cols-3 gap-6'>
          {products.map(product => (
            <motion.li 
              key={crypto.randomUUID()}
              className='border border-gray-light rounded-md overflow-hidden'
            >
              <Link 
                href={`/catalog/${category}/${product._id!}`} 
                className='px-3 py-6 flex flex-col justify-center items-center '
              >
                <Image 
                  src={product.images[0]}
                  alt={product.name}
                  width={350}
                  height={350}
                />
                <p className='text-lg font-bold'>
                  {product.name}
                </p>
                <Divider />
                <p className='text-2xl font-bold'>
                  &euro;{product.price}
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
        {productsCount > products.length && (
          <button 
            onClick={(e) => {
              e.preventDefault()
              setPage(page + 1)
            }}
            className='w-full block mx-auto my-6 md:w-80 px-4 py-2 text-base font-semibold border border-accent-dark rounded-md'
          >
            View More
          </button>
        )}
      </section>
    </div>
  );
};

export default CategoryProducts;