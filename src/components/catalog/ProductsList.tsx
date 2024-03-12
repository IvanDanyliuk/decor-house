'use client';

import { getProducts } from '@/lib/queries/product.queries';
import { IProduct } from '@/lib/types/products.types';
import { removeFalsyObjectFields } from '@/utils/helpers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Divider } from 'antd';
import LoadMoreButton from './LoadMoreButton';


interface IProductsList {
  category: string;
}

const ProductsList: React.FC<IProductsList> = ({ category }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const types = searchParams.get('types');
    const features = searchParams.get('features');
    const manufacturers = searchParams.get('manufacturers');
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
    const order = searchParams.get('order');
    const sortIndicator = searchParams.get('sortIndicator');

    const query = removeFalsyObjectFields({ page, itemsPerPage: 12, category, types, features, manufacturers, minPrice, maxPrice, order, sortIndicator });

    if(currentPage === 1 && currentPage !== page) {
      getProducts({ ...query, page: 1, itemsPerPage: page * 12 }).then(res => {
        setProducts(res.data.products);
        setCount(res.data.count);
      });
      setCurrentPage(page);
    } else {
      getProducts(query).then(res => {
        if(currentPage === page) {
          setProducts([...products, ...res.data.products]);
        } else {
          setProducts(res.data.products);
        }
        setCount(res.data.count);
      });
    }
  }, [searchParams])

  return (
    <div>
      <ul className='w-full grid grid-cols-1 md:grid-cols-3 gap-6'>
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
              <p className='text-xl md:text-2xl font-bold'>
                &euro;{product.price}
              </p>
            </Link>
          </motion.li>
        ))}
      </ul>
      {count > products.length && (
        <LoadMoreButton onSetPageNumber={setCurrentPage} />
      )}
    </div>
  );
};

export default ProductsList;