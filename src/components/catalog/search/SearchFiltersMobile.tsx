'use client';

import React, { ChangeEvent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Drawer } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { ICheckedSearchFilters, IFilterItem, ISearchFiltersData } from '@/lib/types/products.types';
import Accordion from '@/components/ui/Accordion';


interface ISearchFiltersMobile {
  categories: IFilterItem[];
  types: IFilterItem[];
  manufacturers: IFilterItem[];
}

interface IFilterDataBranches {
  title: string;
  name: keyof ICheckedSearchFilters;
}


const SearchFiltersMobile: React.FC<ISearchFiltersMobile> = ({ categories, types, manufacturers }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterData: ISearchFiltersData = { category: categories, types, manufacturers };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filterDataBranches: IFilterDataBranches[] = [
    { title: 'Categories', name: 'category' },
    { title: 'Types', name: 'types' },
    { title: 'Manufacturers', name: 'manufacturers' },
  ];

  const handleMenuOpen = () => {
    setIsOpen(prev => !prev);
  };

  const isValueChecked = (name: string, value: string) => {
    const currentSearchParams = searchParams.get(name);
    if(currentSearchParams) {
      const splittedSearchParams = currentSearchParams.split(';');
      return splittedSearchParams.includes(value);
    } else {
      return false;
    }
  };

  const handleOptionSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    const currentValues = searchParams.get(name);
    const params = new URLSearchParams(searchParams.toString());

    if(!checked) {
      const newValues = currentValues!.split(';').filter(item => item !== value).join(';');
      params.set(name, newValues!);
    } else {
      const newValues = name !== 'category' ? (currentValues ? currentValues + ';' + value : value) : value;
      params.set(name, newValues);
    }

    if(!params.get(name)) {
      params.delete(name);
    }

    router.push(pathname + (pathname.toString() ? '?' + params.toString() : ''));
  };

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
              {(filterData[name] as IFilterItem[]).map(option => (
                <li 
                  key={crypto.randomUUID()} 
                  className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
                >
                  <label>
                    <input 
                      id={name}
                      name={name}
                      type='checkbox' 
                      value={option.value} 
                      checked={isValueChecked(name, option.value)}
                      onChange={handleOptionSelect} 
                      data-testid='selectProductCheckbox'
                    />
                    <span className='ml-3'>{option.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </Accordion>
        ))}
      </Drawer>
    </div>
  );
};

export default SearchFiltersMobile;