'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { getProducts, searchProducts } from '@/lib/queries/product.queries';
import { IProduct } from '@/lib/types/products.types';
import { removeFalsyObjectFields } from '@/utils/helpers';
import LoadMoreButton from './LoadMoreButton';


interface IProductsList {
  category?: string;
}

const ProductsList: React.FC<IProductsList> = ({ category }) => {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const searchQuery = searchParams.get('query')
    const categoryParam = searchParams.get('category');
    const types = searchParams.get('types');
    const features = searchParams.get('features');
    const manufacturers = searchParams.get('manufacturers');
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
    const order = searchParams.get('order');
    const sortIndicator = searchParams.get('sortIndicator');

    const query = removeFalsyObjectFields({ 
      page, 
      itemsPerPage: 12, 
      query: searchQuery,
      category: category ? category : categoryParam, 
      types, 
      features, 
      manufacturers, 
      minPrice, 
      maxPrice, 
      order, 
      sortIndicator 
    });

    if(currentPage === 1 && currentPage !== page) {
      if(searchQuery) {
        setLoading(true);
        searchProducts({ ...query, page: 1, itemsPerPage: page * 12 }).then(res => {
          const response = res.data ? {
            products: res.data.products,
            count: res.data.count
          } : {
            products: [],
            count: 0
          };
          setProducts(response.products);
          setCount(response.count);
          setLoading(false);
        });
      } else {
        setLoading(true);
        getProducts({ ...query, page: 1, itemsPerPage: page * 12 }).then(res => {
          const response = res.data ? {
            products: res.data.products,
            count: res.data.count
          } : {
            products: [],
            count: 0
          };
          setProducts(response.products);
          setCount(response.count);
          setLoading(false);
        });
      }
      setCurrentPage(page);
    } else {
      if(searchQuery) {
        setLoading(true);
        searchProducts(query).then(res => {
          const response = res.data ? {
            products: res.data.products,
            count: res.data.count
          } : {
            products: [],
            count: 0
          };
          if(currentPage === page && page !== 1) {
            setProducts([...products, ...response.products]);
          } else {
            setProducts(response.products);
          }
          setCount(response.count);
          setLoading(false);
        });
      } else {
        setLoading(true);
        getProducts(query).then(res => {
          const response = res.data ? {
            products: res.data.products,
            count: res.data.count
          } : {
            products: [],
            count: 0
          };
          if(currentPage === page && page !== 1) {
            setProducts([...products, ...response.products]);
          } else {
            setProducts(response.products);
          }
          setCount(response.count);
          setLoading(false);
        });
      }
      setCurrentPage(1)
    }
  }, [searchParams]);

  if(products.length === 0) {
    if(loading) {
      return (
        <div className='w-full py-52 flex justify-center items-center'>
          <LoadingOutlined />
        </div>
      );
    } else {
      return (
        <div className='w-full py-52 text-center text-gray-dark text-xl font-semibold'>
          <p>Cannot find products</p>
        </div>
      );
    }
  }

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