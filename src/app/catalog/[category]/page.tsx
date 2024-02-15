'use client';

import { FocusEvent, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Divider, InputNumber, Modal, Select, Slider } from 'antd';
import { getProducts, getProductsFilterData } from '@/lib/queries/product.queries';
import { IProduct } from '@/lib/types/products.types';
import { IManufacturer } from '@/lib/types/manufacturer.types';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import FilterSelect from '@/components/catalog/ProductFilters/FilterSelect';
import PriceFilter from '@/components/catalog/ProductFilters/PriceFilter';


interface IProductFiltersData {
  types: {
    value: string,
    label: string
  }[];
  features: {
    value: string,
    label: string
  }[];
  manufacturers: {
    value: string,
    label: string
  }[];
  price: {
    min: number,
    max: number,
  };
}

interface ICheckedFilters {
  types: string[];
  features: string[];
  manufacturers: string[];
  price: {
    min: number;
    max: number;
  };
}

const checkedFiltersInitialState: ICheckedFilters = {
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

  const path= usePathname();
  const modifiedPath = path.slice(1).replaceAll('/', ' / ');

  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [filtersData, setFiltersData] = useState<IProductFiltersData | null>(null);
  const [checkedFilters, setCheckedFilters] = useState<ICheckedFilters>(checkedFiltersInitialState);

  const handleFilterProducts = (key: string, values: string[]) => {
    setProducts([]);
    setCheckedFilters({
      ...checkedFilters,
      [key]: values
    });
  };

  // const handleTypesChange = (value: string[]) => {
  //   setProducts([]);
  //   setCheckedFilters({
  //     ...checkedFilters,
  //     types: value
  //   });
  // };

  // const handleFeaturesChange = (value: string[]) => {
  //   setProducts([]);
  //   setCheckedFilters({
  //     ...checkedFilters,
  //     features: value
  //   });
  // };

  // const handleManufacturersChange = (value: string[]) => {
  //   setProducts([]);
  //   setCheckedFilters({
  //     ...checkedFilters,
  //     manufacturers: value
  //   });
  // };

  const handlePriceRangeChange = (newPriceValues: { min: number, max: number }) => {
    setProducts([]);
    setCheckedFilters({
      ...checkedFilters,
      price: newPriceValues
    });
  };

  const handleFilterItemDelete = (key: keyof ICheckedFilters, value: string) => {
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
                <FilterSelect 
                  name='types'
                  title='Types' 
                  options={filtersData.types} 
                  selectedOptions={checkedFilters.types} 
                  multiple 
                  onChange={handleFilterProducts} 
                />
                <FilterSelect 
                  name='features'
                  title='Features' 
                  options={filtersData.features} 
                  selectedOptions={checkedFilters.features} 
                  multiple 
                  onChange={handleFilterProducts} 
                />
                <FilterSelect 
                  name='manufacturers'
                  title='Manufacturers' 
                  options={filtersData.manufacturers} 
                  selectedOptions={checkedFilters.manufacturers} 
                  multiple 
                  onChange={handleFilterProducts} 
                />
                <PriceFilter 
                  min={filtersData.price.min} 
                  max={filtersData.price.max} 
                  onChange={handlePriceRangeChange} 
                />
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
      </section>
    </div>
  );
};

export default CategoryProducts;