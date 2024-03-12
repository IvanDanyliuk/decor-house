// 'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Divider, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { getProducts, getProductsFilterData, getRelatedProducts } from '@/lib/queries/product.queries';
import { ICheckedProductFilters, IPrice, IProduct, IProductFiltersData, IRelatedProducts } from '@/lib/types/products.types';
import { IManufacturer } from '@/lib/types/manufacturer.types';
import ProductFilters from '@/components/catalog/ProductFilters/ProductFilters';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import ProductFiltersMobile from '@/components/catalog/ProductFilters/ProductFiltersMobile';
import RelatedProducts from '@/components/catalog/RelatedProducts';
import { getServerSession } from 'next-auth';
import ProductsList from '@/components/catalog/ProductsList';
import ResetFiltersButton from '@/components/catalog/ProductFilters/ResetFiltersButton';


const checkedFiltersInitialState: ICheckedProductFilters = {
  types: [],
  features: [],
  manufacturers: [],
  price: {
    min: 0,
    max: 0,
  },
  order: 'asc',
  sortIndicator: 'createdAt',
};

const sortItems = [
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'createdAt'
    }),
    label: 'Newest',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'price'
    }),
    label: 'Price: Low to High',
  },
  {
    value: JSON.stringify({
      order: 'desc',
      sortIndicator: 'price'
    }),
    label: 'Price: High to Low',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'name'
    }),
    label: 'Name: A-Z',
  },
  {
    value: JSON.stringify({
      order: 'desc',
      sortIndicator: 'name'
    }),
    label: 'Name: Z-A',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'size.width'
    }),
    label: 'Width',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'size.height'
    }),
    label: 'Height',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'size.depth'
    }),
    label: 'Depth',
  },
];


const CategoryProducts = async ({ params, searchParams }: { params: { category: string }, searchParams: { [key: string]: string } }) => {
  const { category } = params;

  const session = await getServerSession();

  const filtersData = await getProductsFilterData(category);
  const relatedProducts = await getRelatedProducts(session?.user?.email!, 10);

  console.log('CATALOG PAGE', filtersData)

  // const { data: session } = useSession();
  // const { width } = useWindowSize();

  // const [page, setPage] = useState<number>(1);
  // const [products, setProducts] = useState<IProduct[]>([]);
  // const [productsCount, setProductsCount] = useState<number>(0);
  // const [filtersData, setFiltersData] = useState<IProductFiltersData | null>(null);
  // const [checkedFilters, setCheckedFilters] = useState<ICheckedProductFilters>(checkedFiltersInitialState);
  // const [relatedProducts, setRelatedProducts] = useState<IRelatedProducts | null>(null);

  // const handleSetFilters = (key: string, values: string[] | IPrice) => {
  //   setProducts([]);
  //   if(key === 'price' && 'min' in values && 'max' in values) {
  //     setCheckedFilters({
  //       ...checkedFilters,
  //       price: values
  //     });
  //   } else {
  //     setCheckedFilters({
  //       ...checkedFilters,
  //       [key]: values
  //     });
  //   }
  // };

  // const clearFilters = () => {
  //   setProducts([]);
  //   setCheckedFilters({
  //     types: [],
  //     features: [],
  //     manufacturers: [],
  //     price: {
  //       min: filtersData?.price.min!,
  //       max: filtersData?.price.max!,
  //     },
  //     order: 'asc',
  //     sortIndicator: 'createdAt',
  //   });
  // };

  // const handleFilterItemDelete = (key: keyof ICheckedProductFilters, value: string) => {
  //   if(key !== 'price' && key !== 'order' && key !== 'sortIndicator') {
  //     setProducts([]);
  //     setCheckedFilters({
  //       ...checkedFilters,
  //       [key]: checkedFilters[key].filter((item: string) => item !== value),
  //     });
  //   }
  // };

  // const handleSortChange = (value: string) => {
  //   const parsedValue = JSON.parse(value);
  //   setProducts([]);
  //   setCheckedFilters({
  //     ...checkedFilters,
  //     order: parsedValue.order,
  //     sortIndicator: parsedValue.sortIndicator,
  //   });
  // };

  return (
    <div className='w-full'>
      <section className='w-full py-6 bg-main-bg'>
        <div className='container mx-auto mb-3 flex gap-1 text-sm font-semibold capitalize'>
          <Link href='/catalog'>Catalog</Link>
          <span>/</span>
          <p>{category}</p>
        </div>
        <h2 className='container mx-auto page-heading-primary'>
          {category.replaceAll('-', ' ')}
        </h2>
      </section>
      <section className='w-full container mx-auto py-6'>
        <div className='w-full flex justify-between items-center'>
          <div className='w-full flex gap-6'>
            <ProductFilters 
              filtersData={filtersData} 
              sortData={sortItems}
            />
            {/* {filtersData && (
              <>
                {width && width >= 640 ? (
                  <ProductFilters 
                    filtersData={filtersData} 
                    checkedFilters={checkedFilters} 
                    onSetFilters={handleSetFilters} 
                  />
                ) : (
                  <ProductFiltersMobile 
                    filtersData={filtersData}
                    checkedFilters={checkedFilters}
                    onSetFilters={handleSetFilters}
                  />
                )}
              </>
            )} */}
          </div>
        </div>
        <Divider />
        <div className='flex justify-between items-center'>
          <ul className='flex gap-3'>
            {/* {checkedFilters.types.map(item => (
              <li 
                key={crypto.randomUUID()}
                className='px-3 py-2 flex gap-3 text-sm font-semibold bg-main-bg'
              >
                <span>{item}</span>
                <CloseOutlined onClick={() => handleFilterItemDelete('types', item)} />
              </li>
            ))} */}
            {/* {checkedFilters.features.map(item => (
              <li 
                key={crypto.randomUUID()}
                className='px-3 py-2 flex gap-3 text-sm font-semibold bg-main-bg'
              >
                <span>{item}</span>
                <CloseOutlined onClick={() => handleFilterItemDelete('features', item)} />
              </li>
            ))} */}
            {/* {checkedFilters.manufacturers.map(item => (
              <li 
                key={crypto.randomUUID()}
                className='px-3 py-2 flex gap-3 text-sm font-semibold bg-main-bg'
              >
                <span>{filtersData?.manufacturers.find(val => val.value === item)?.label}</span>
                <CloseOutlined onClick={() => handleFilterItemDelete('manufacturers', item)} />
              </li>
            ))} */}
          </ul>
          <ResetFiltersButton />
        </div>
      </section>
      <section className='relative w-full container mx-auto box-border'>
        <ProductsList category={category} />
        <Divider />
      </section>
      <section className='w-full mx-auto container'>
        {relatedProducts && (
          <RelatedProducts products={relatedProducts} />
        )}
      </section>
    </div>
  );
};

export default CategoryProducts;