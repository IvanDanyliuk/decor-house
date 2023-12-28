'use client';

import { useEffect, useState } from 'react';
import { DownOutlined, ExclamationCircleOutlined, UpOutlined } from '@ant-design/icons';


interface ISelectField {
  label: string;
  name: string;
  title: string;
  options: {
    label: string;
    value: string;
  }[];
  required?: boolean;
  onChange?: (selected: string[]) => void;
  error?: string[];
}


const SelectField: React.FC<ISelectField> = ({ 
  label, 
  name, 
  title, 
  options, 
  required, 
  onChange, 
  error 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleMenuOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleSelectOptions = (e: any) => {
    if(e.target.checked) {
      setSelectedOptions([...selectedOptions, e.target.value]);
    } else {
      setSelectedOptions(selectedOptions.filter(item => item !== e.target.value));
    }
  };

  const handleSelectAllOptions = () => {
    const isAllOptionsSelected = options.every(item => selectedOptions.includes(item.value));

    if(isAllOptionsSelected) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options.map(item => item.value));
    }
  };

  useEffect(() => {
    if(onChange) {
      onChange(selectedOptions);
    }
  }, [selectedOptions])

  return (
    <div className='relative w-full flex flex-col md:flex-row items-center gap-3 z-50'>
      {label && (
        <label 
          htmlFor={name} 
          className='w-full md:w-36 text-sm font-semibold'
        >
          {label}
        </label>
      )}
      <div className='relative w-full md:grow'>  
        <button 
          type='button' 
          onClick={handleMenuOpen} 
          className='w-full h-10 flex items-center gap-3'
        >
          <span>{title}</span>
          {isOpen ? <UpOutlined className='text-sm' /> : <DownOutlined className='text-sm' />}
        </button>
        {isOpen && (
          <ul className='absolute top-10 w-full bg-white'>
            <li key={crypto.randomUUID()} className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'>
              <input 
                type='checkbox' 
                checked={options.every(item => selectedOptions.includes(item.value))}
                onChange={handleSelectAllOptions} 
              />
              <label>All</label>
            </li>
            {options.map(option => (
              <li key={crypto.randomUUID()} className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'>
                <input 
                  type='checkbox' 
                  value={option.value} 
                  checked={selectedOptions.includes(option.value)}
                  onChange={handleSelectOptions} 
                />
                <label>{option.label}</label>
              </li>
            ))}
          </ul>
        )}
        <p className='mt-1 text-xs text-red-600'>
          {error && (
            <>
              <ExclamationCircleOutlined />
              <span className='ml-1'>{error.join(' ')}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default SelectField;