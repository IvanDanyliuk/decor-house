'use client';

import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';


interface IFilterSelect {
  title: string;
  options: {
    value: string;
    label: string;
  }[];
  selectedOptions: string[];
  multiple?: boolean;
  onChange: (values: string[]) => void;
}


const FilterSelect: React.FC<IFilterSelect> = ({ title, options, selectedOptions, multiple, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelectAllOptions = () => {
    const isAllSelected = options.every(option => selectedOptions.includes(option.value));

    if(isAllSelected) {
      onChange([]);
    } else {
      const values = options.map(option => option.value);
      onChange(values);
    }
  };

  const handleOptionSelect = (value: string) => {
    const isOptionSelected = selectedOptions.includes(value);

    if(isOptionSelected) {
      const filteredOptions = selectedOptions.filter(option => option !== value);
      onChange(filteredOptions);
    } else {
      onChange([...selectedOptions, value]);
    }
  };

  return (
    <>
      {isOpen && (
        <div className='absolute top-0 bottom-0 left-0 right-0 z-20' onClick={handleSelectOpen} />
      )}
      <div className='w-full'>
        <button
          type='button'
          onClick={handleSelectOpen}
          className='flex items-center gap-3 text-sm font-semibold'
        >
          <span>{title}</span>
          <DownOutlined />
        </button>
        {isOpen && options.length && (
          <ul className='w-fit absolute bg-white rounded z-30'>
            {multiple && (
              <li 
                onClick={handleSelectAllOptions} 
                className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
              >
                <input 
                  id='All'
                  type='checkbox' 
                  checked={options.every(item => selectedOptions.includes(item.value))}
                  onChange={handleSelectAllOptions} 
                  data-testid='selectProductCheckbox'
                />
                <label>All</label>
              </li>
            )}
            {options.map(option => (
              <li 
                key={crypto.randomUUID()} 
                onClick={() => handleOptionSelect(option.value)} 
                className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
              >
                <input 
                  id={title}
                  type='checkbox' 
                  value={option.value} 
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionSelect(option.value)} 
                  data-testid='selectProductCheckbox'
                />
                <label>{option.label}</label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default FilterSelect