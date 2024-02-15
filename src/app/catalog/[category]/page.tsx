'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Divider } from 'antd';
import { getProducts, getProductsFilterData } from '@/lib/queries/product.queries';
import { ICheckedProductFilters, IPrice, IProduct, IProductFiltersData } from '@/lib/types/products.types';
import { IManufacturer } from '@/lib/types/manufacturer.types';
import { CloseOutlined } from '@ant-design/icons';
import ProductFilters from '@/components/catalog/ProductFilters/ProductFilters';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import ProductFiltersMobile from '@/components/catalog/ProductFilters/ProductFiltersMobile';


const checkedFiltersInitialState: ICheckedProductFilters = {
  types: [],
  features: [],
  manufacturers: [],
  price: {
    min: 0,
    max: 0,
  }
};


const CategoryProducts = ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const { width } = useWindowSize();
  const path= usePathname();
  const modifiedPath = path.slice(1).replaceAll('/', ' / ');

  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [filtersData, setFiltersData] = useState<IProductFiltersData | null>(null);
  const [checkedFilters, setCheckedFilters] = useState<ICheckedProductFilters>(checkedFiltersInitialState);

  const handleSetFilters = (key: string, values: string[] | IPrice) => {
    setProducts([]);
    if(key === 'price' && 'min' in values && 'max' in values) {
      setCheckedFilters({
        ...checkedFilters,
        price: values
      });
    } else {
      setCheckedFilters({
        ...checkedFilters,
        [key]: values
      });
    }
  };

  const clearFilters = () => {
    setProducts([]);
    setCheckedFilters({
      types: [],
      features: [],
      manufacturers: [],
      price: {
        min: filtersData?.price.min!,
        max: filtersData?.price.max!,
      }
    });
  };

  const handleFilterItemDelete = (key: keyof ICheckedProductFilters, value: string) => {
    if(key !== 'price') {
      setProducts([]);
      setCheckedFilters({
        ...checkedFilters,
        [key]: checkedFilters[key].filter((item: string) => item !== value),
      });
    }
  };

  useEffect(() => {
    const { types, features, manufacturers, price } = checkedFilters;

    getProducts({ 
      page, 
      itemsPerPage: 12, 
      category, 
      types: types.join(', '), 
      features: features.join(', '), 
      manufacturers: manufacturers.join(', '), 
      minPrice: price.min,
      maxPrice: price.max,
    }).then(res => {
      setProducts([...products, ...res.data.products]);
      setProductsCount(res.data.count);
    });
    
    if(!filtersData) {
      getProductsFilterData(category).then(res => {
        const types = res.types.map((item: string) => ({ 
          value: item, 
          label: item 
        }));
  
        const features = res.features.map((item: string) => ({ 
          value: item, 
          label: item
        }));
  
        const manufacturers = res.manufacturers.map((item: IManufacturer) => ({ 
          value: item._id!, 
          label: item.name 
        }));
        
        const price = res.price;
  
        setFiltersData({ types, features, manufacturers, price });
        setCheckedFilters({ ...checkedFilters, price });
      });
    }
  }, [page, checkedFilters]);

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
      <section className='w-full container mx-auto py-6'>
        <div className='w-full flex justify-between items-center'>
          <div className='flex gap-6'>
            {filtersData && (
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
            )}
          </div>
          <button className='flex items-center gap-1'>
            <span className='font-semibold'>Sort</span>
            <Image 
              src='/assets/icons/arrows.png'
              alt='previous'
              width={15}
              height={15}
              className='rotate-90'
            />
          </button>
        </div>
        <Divider />
        <div className='flex justify-between items-center'>
          <ul className='flex gap-3'>
            {checkedFilters.types.map(item => (
              <li 
                key={crypto.randomUUID()}
                className='px-3 py-2 flex gap-3 text-sm font-semibold bg-main-bg'
              >
                <span>{item}</span>
                <CloseOutlined onClick={() => handleFilterItemDelete('types', item)} />
              </li>
            ))}
            {checkedFilters.features.map(item => (
              <li 
                key={crypto.randomUUID()}
                className='px-3 py-2 flex gap-3 text-sm font-semibold bg-main-bg'
              >
                <span>{item}</span>
                <CloseOutlined onClick={() => handleFilterItemDelete('features', item)} />
              </li>
            ))}
            {checkedFilters.manufacturers.map(item => (
              <li 
                key={crypto.randomUUID()}
                className='px-3 py-2 flex gap-3 text-sm font-semibold bg-main-bg'
              >
                <span>{filtersData?.manufacturers.find(val => val.value === item)?.label}</span>
                <CloseOutlined onClick={() => handleFilterItemDelete('manufacturers', item)} />
              </li>
            ))}
          </ul>
          <button type='button' onClick={clearFilters} className='flex items-center gap-1 font-semibold'>
            Reset Filters
          </button>
        </div>
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
            className='w-full block mx-auto my-8 md:w-80 px-4 py-2 text-base font-semibold border border-accent-dark rounded-md'
          >
            View More
          </button>
        )}
        <Divider />
      </section>
      
    </div>
  );
};

export default CategoryProducts;