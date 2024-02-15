'use client';

import { FocusEvent, useState } from 'react';
import { Drawer, InputNumber, Slider } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import Accordion from '@/components/ui/Accordion';
import { ICheckedProductFilters, IPrice, IProductFiltersData } from '@/lib/types/products.types';


interface IProductFilters {
  filtersData: IProductFiltersData;
  checkedFilters: ICheckedProductFilters;
  onSetFilters: (key: string, values: string[] | IPrice) => void;
}


const ProductFiltersMobile: React.FC<IProductFilters> = ({ filtersData, checkedFilters, onSetFilters }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [priceValues, setPriceValues] = useState<IPrice>({ 
    min: filtersData.price.min, 
    max: filtersData.price.max 
  });

  const filterDataBranches: {title: string, name: keyof ICheckedProductFilters}[] = [
    { title: 'Types', name: 'types' },
    { title: 'Features', name: 'features' },
    { title: 'Manufacturers', name: 'manufacturers' },
  ];

  const handleMenuOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handlePriceChange = (range: number[]) => {
    setPriceValues({ min: range[0], max: range[1] });
  };

  const handlePriceChangeComplete = (range: number[]) => {
    onSetFilters('price', { min: range[0], max: range[1] })
  };

  const handleOptionSelect = (key: keyof ICheckedProductFilters, value: string | IPrice) => {
    if(key !== 'price' && typeof value !== 'object') {
      const isOptionSelected = checkedFilters[key].includes(value);

      if(isOptionSelected) {
        const filteredOptions = checkedFilters[key].filter(option => option !== value);
        onSetFilters(key, filteredOptions);
      } else {
        onSetFilters(key, [...checkedFilters[key], value]);
      }
    }
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
              {name !== 'price' && filtersData[name].map(option => (
                <li 
                  key={crypto.randomUUID()} 
                  onClick={() => handleOptionSelect(name, option.value)} 
                  className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
                >
                  <input 
                    type='checkbox' 
                    value={option.value} 
                    checked={checkedFilters[name].includes(option.value)}
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
                value={checkedFilters.price.min} 
                onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
                  handleOptionSelect('price', { ...checkedFilters.price, min: +e.target.value! })
                }} 
                className='flex-1'
              />
              <InputNumber 
                value={checkedFilters.price.max} 
                onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
                  handleOptionSelect('price', { ...checkedFilters.price, min: +e.target.value! })
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
              onChange={handlePriceChange}
              onAfterChange={handlePriceChangeComplete} 
            />
          </div>
        </Accordion>
      </Drawer>
    </div>
  );
};

export default ProductFiltersMobile;