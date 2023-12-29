'use client';

import { useEffect, useState } from 'react';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


type Option = {
  label: string;
  value: string;
}

interface ISelect {
  name: string;
  label: string;
  title?: string;
  disabled?: boolean;
  multiple?: boolean;
  options: Option[];
  onChange: (value: string) => void;
  error?: string[];
}


const Select: React.FC<ISelect> = ({ name, label, title, disabled, multiple = false, options, onChange, error }) => {
  const initialState = multiple ? [] : { label: '', value: '' };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<Option | Option[]>(initialState);
  const [selectedValues, setSelectedValues] = useState<string>(title || 'Select')

  const isOptionChecked = (value: string) => {
    if(multiple && Array.isArray(data)) {
      const res = data.find(item => item.value === value);
      return Boolean(res);
    } 
    if(!multiple && data instanceof Option) {
      return data.value === value;
    }
    return false;
  };

  const handleSelectOpen = () => {
    setIsOpen(prevState => !prevState);
  }

  const handleValueChange = (option: Option) => {
    if(multiple && Array.isArray(data)) {
      const isOptionSelected = data.find(item => item.value === option.value);
      if(isOptionSelected) {
        const newState = data.filter(item => item.value !== option.value)
        setData(newState);
        setSelectedValues(newState.map(item => item.label).join(', '));
        onChange(option.value);
      } else {
        const newState = [...data, option];
        setData(newState);
        setSelectedValues(newState.map(item => item.label).join(', '));
        onChange(newState.map(item => item.value).join(', '));
      }
    } else {
      setData(option);
      setSelectedValues(option.label);
      onChange(option.value);
      setIsOpen(false);
    }
  };

  return (
    <div className='w-full flex flex-col md:flex-row items-center gap-3'>
      {label && (
        <div className='w-full md:w-36 text-sm font-semibold'>
          {label}
        </div>
      )}
      {isOpen && (
        <div className='absolute top-0 bottom-0 left-0 right-0' onClick={handleSelectOpen} />
      )}
      <div className='relative w-full md:grow'>  
        <button 
          type='button' 
          onClick={handleSelectOpen}
          className='w-full h-10 flex justify-between items-center cursor-pointer border rounded px-3 bg-white'
        >
          <span>
            {selectedValues}
          </span>
          <DownOutlined className='text-sm' />
        </button>
        {isOpen && options.length > 0 && (
          <ul className='w-full absolute top-10 bg-white rounded z-10'>
            {options.map(option => (
              <li 
                key={crypto.randomUUID()} 
                onClick={() => handleValueChange(option)} 
                className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
              >
                <input 
                  name={name}
                  type='checkbox' 
                  value={option.value} 
                  checked={isOptionChecked(option.value)}
                  onChange={() => handleValueChange(option)} 
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

export default Select;