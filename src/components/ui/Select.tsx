'use client';

import { useEffect, useState } from 'react';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


interface Option {
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
  onChange?: (value: string) => void;
  error?: string[];
}


const Select: React.FC<ISelect> = ({ name, label, title, disabled, multiple = false, options, onChange, error }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<string>('');
  const [selectedValues, setSelectedValues] = useState<string>('')

  const handleSelectOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleSelectAllOptions = () => {
    const optionValues = options.map(item => item.value);
    const isAllSelected = data.split(', ').every(item => optionValues.includes(item));
    if(!isAllSelected) {
      const allData = optionValues.join(', ');
      const allSelectedValues = options.map(item => item.label).join(', ');
      setData(allData);
      setSelectedValues(allSelectedValues);
    } else {
      setData('');
      setSelectedValues('');
    }
  };

  const handleValueChange = (option: Option) => {
    if(multiple) {
      const splittedData = data.split(', ');
      const isOptionSelected = splittedData.includes(option.value);
      if(isOptionSelected) {
        const newData = splittedData.filter(item => item !== option.value).join(', ');
        const newSelectedValues = selectedValues.split(', ').filter(item => item !== option.label).join(', ');
        setData(newData);
        setSelectedValues(newSelectedValues);
      } else {
        const newData = data + `${data ? ', ' + option.value : option.value}`;
        const newSelectedValues = selectedValues + `${selectedValues ? ', ' + option.label : option.label}`;
        setData(newData);
        setSelectedValues(newSelectedValues);
      }
    } else {
      setData(option.value);
      setSelectedValues(option.label);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if(onChange) {
      onChange(data);
    }
  }, [data]);

  useEffect(() => {
    if(data && selectedValues) {
      const optionValues = options.map(item => item.value);
      const isDataActual = data.split(', ').every(item => optionValues.includes(item));
      if(!isDataActual) {
        setSelectedValues('')
        setData('')
      }
    }
  }, [options]);

  return (
    <div className='w-full flex flex-col md:flex-row items-center gap-3'>
      <input name={name} type='text' defaultValue={data} className='hidden' />
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
            {
              selectedValues ? 
                multiple ? 
                  `Selected ${selectedValues.split(', ').length} ${name}s` : 
                  selectedValues : 
                title
              }
          </span>
          <DownOutlined className='text-xs' />
        </button>
        {isOpen && options.length > 0 && (
          <ul className='w-full absolute top-10 bg-white rounded z-10'>
            {multiple && (
              <li 
                onClick={handleSelectAllOptions} 
                className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
              >
                <input 
                  id='All'
                  type='checkbox' 
                  // value={option.value} 
                  checked={options.every(item => selectedValues.includes(item.value))}
                  onChange={handleSelectAllOptions} 
                />
                <label>All</label>
              </li>
            )}
            {options.map(option => (
              <li 
                key={crypto.randomUUID()} 
                onClick={() => handleValueChange(option)} 
                className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
              >
                <input 
                  id={name}
                  type='checkbox' 
                  value={option.value} 
                  checked={data.includes(option.value)}
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