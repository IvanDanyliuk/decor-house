'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select } from 'antd';
import FilterSelect from './FilterSelect';
import PriceFilter from './PriceFilter';
import { IFilterItem, IProductFiltersData } from '@/lib/types/products.types';
import { useWindowSize } from '@/utils/hooks/use-window-size';
import ProductFiltersMobile from './ProductFiltersMobile';


interface IProductFilters {
  filtersData: IProductFiltersData;
  sortData: IFilterItem[];
}


const ProductFilters: React.FC<IProductFilters> = ({ filtersData, sortData }) => {
  const { width } = useWindowSize();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortValueInitialState = searchParams.get('order') && searchParams.get('sortIndicator') ? 
    JSON.stringify({ order: searchParams.get('order'), sortIndicator: searchParams.get('sortIndicator') }) : 
    sortData[0].value;
  
  const [sortValue, setSortValue] = useState<string>(sortValueInitialState);

  const createSortingQueryString = useCallback(
    (order: string, sortIndicator: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('order', order);
      params.set('sortIndicator', sortIndicator);
      params.set('page', '1');
      return params.toString();
    },
    [searchParams]
  );

  const handleSortChange = (value: string) => {
    setSortValue(value);
    const parsedValue = JSON.parse(value);
    router.push(`${pathname}?${createSortingQueryString(parsedValue.order, parsedValue.sortIndicator)}`);
  };

  useEffect(() => {
    if(!searchParams.get('order') && !searchParams.get('sortIndicator')) {
      setSortValue(sortData[0].value);
    }
  }, [searchParams]);

  return (
    <div className='w-full flex justify-between items-center'>
      {width && width >= 640 ? (
        <div className='flex gap-6'>
          <FilterSelect 
            name='types'
            title='Types' 
            options={filtersData.types} 
          />
          <FilterSelect 
            name='features'
            title='Features' 
            options={filtersData.features} 
          />
          <FilterSelect 
            name='manufacturers'
            title='Manufacturers' 
            options={filtersData.manufacturers} 
          />
          <PriceFilter 
            name='price'
            min={filtersData.price.min.toString()} 
            max={filtersData.price.max.toString()} 
          />
        </div>
      ) : (
        <ProductFiltersMobile filtersData={filtersData} sortData={sortData} />
      )}
      <Select 
        options={sortData}
        value={sortValue}
        onChange={handleSortChange}
        className='w-52'
      />
    </div>
  );
};

export default ProductFilters;