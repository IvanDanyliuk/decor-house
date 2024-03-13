'use client';

import { FocusEvent, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Drawer, InputNumber, Slider } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import Accordion from '@/components/ui/Accordion';
import { ICheckedProductFilters, IFilterItem, IProductFiltersData } from '@/lib/types/products.types';


interface IProductFilters {
  filtersData: IProductFiltersData;
  sortData: IFilterItem[];
}

interface IPriceValues {
  min: number;
  max: number;
}


const ProductFiltersMobile: React.FC<IProductFilters> = ({ filtersData }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [priceValues, setPriceValues] = useState<IPriceValues>({ min: filtersData.price.min, max: filtersData.price.max });

  const filterDataBranches: {title: string, name: keyof ICheckedProductFilters}[] = [
    { title: 'Types', name: 'types' },
    { title: 'Features', name: 'features' },
    { title: 'Manufacturers', name: 'manufacturers' },
  ];

  const handleMenuOpen = () => {
    setIsOpen(prev => !prev);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.set('page', '1');
      return params.toString()
    },
    [searchParams]
  );

  const isValueChecked = (name: string, value: string) => {
    const currentSearchParams = searchParams.get(name);
    if(currentSearchParams) {
      const splittedSearchParams = currentSearchParams.split(';');
      return splittedSearchParams.includes(value);
    } else {
      return false;
    }
  }

  const handleOptionSelect = (name: string, value: string) => {
    const currentParams = searchParams.get(name);
    if(currentParams) {
      const splittedSearchParams = currentParams.split(';');
      const isValueChecked = splittedSearchParams.includes(value);

      if(isValueChecked) {
        const newSearchParams = splittedSearchParams.filter(item => item !== value).join(';');
        const newPathname = newSearchParams.length > 0 ? 
          `${pathname}?${createQueryString(name, newSearchParams)}` : 
          pathname;
        router.push(newPathname);
      } else {
        const newSearchParams = [...splittedSearchParams, value].join(';');
        router.push(`${pathname}?${createQueryString(name, newSearchParams)}`)
      }
    } else {
      router.push(`${pathname}?${createQueryString(name, value)}`);
    }
  };

  const createPriceQueryString = useCallback(
    (minValue: string, maxValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('minPrice', minValue);
      params.set('maxPrice', maxValue);
      params.set('page', '1');
      return params.toString()
    },
    [searchParams]
  );

  const handleSliderValuesChange = (range: number[]) => {
    setPriceValues({
      min: range[0],
      max: range[1]
    });
  };

  const handlePriceChangeComplete = (range: number[]) => {
    router.push(`${pathname}?${createPriceQueryString(range[0].toString(), range[1].toString())}`);
  };

  useEffect(() => {
    const minPriceParams = searchParams.get('minPrice');
    const maxPriceParams = searchParams.get('maxPrice');
    setPriceValues({
      min: minPriceParams ? Number(minPriceParams) : filtersData.price.min,
      max: maxPriceParams ? Number(maxPriceParams) : filtersData.price.max
    })
  }, []);

  return (
    <div>
      <button type='button' onClick={handleMenuOpen}>
        <FilterOutlined />
      </button>
      <Drawer
        placement='left'
        closable
        open={isOpen}
        onClose={handleMenuOpen}
      >
        {filterDataBranches.map(({ title, name }) => (
          <Accordion title={title} key={crypto.randomUUID()}>
            <ul className='w-full bg-white rounded'>
              {name !== 'price' && (filtersData[name] as IFilterItem[]).map(option => (
                <li 
                  key={crypto.randomUUID()} 
                  onClick={() => handleOptionSelect(name, option.value)} 
                  className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
                >
                  <input 
                    type='checkbox' 
                    value={option.value} 
                    checked={isValueChecked(name, option.value)}
                    onChange={() => handleOptionSelect(name, option.value)} 
                    data-testid='selectProductCheckbox'
                  />
                  <label>{option.label}</label>
                </li>
              ))}
            </ul>
          </Accordion>
        ))}
        <Accordion title='Price'>
          <div className='f-full h-full px-3 pt-8'>
            <div className='mb-8 flex gap-3'>
              <InputNumber 
                value={priceValues.min} 
                onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
                  setPriceValues({ ...priceValues, min: +e.target.value! })
                }} 
                className='flex-1'
              />
              <InputNumber 
                value={priceValues.max} 
                onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
                  setPriceValues({ ...priceValues, max: +e.target.value! })
                }} 
                className='flex-1'
              />
            </div>
            <Slider 
              range 
              min={filtersData.price.min} 
              max={filtersData.price.max} 
              step={1}
              value={[priceValues.min, priceValues.max]} 
              onChange={handleSliderValuesChange}
              onAfterChange={handlePriceChangeComplete} 
            />
          </div>
        </Accordion>
      </Drawer>
    </div>
  );
};

export default ProductFiltersMobile;