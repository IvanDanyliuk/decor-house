'use client';

import { useEffect, useState } from 'react';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


interface ISelectField {
  label: string;
  name: string;
  title: string;
  disabled?: boolean;
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
  disabled, 
  options, 
  required, 
  onChange, 
  error 
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedOptionsToShow, setSelectedOptionsToShow] = useState<string[]>([]);

  const handleSelectOptions = ({ label, value }: { label: string, value: string }) => {
    const isChecked = selectedOptions.includes(value);
    if(!isChecked) {
      setSelectedOptions([...selectedOptions, value]);
      setSelectedOptionsToShow([...selectedOptionsToShow, label]);
    } else {
      setSelectedOptions(selectedOptions.filter(item => item !== value));
      setSelectedOptionsToShow(selectedOptionsToShow.filter(item => item !== label));
    }
  };

  const handleSelectAllOptions = () => {
    const isAllOptionsSelected = options.every(item => selectedOptions.includes(item.value));

    if(isAllOptionsSelected) {
      setSelectedOptions([]);
      setSelectedOptionsToShow([]);
    } else {
      setSelectedOptions(options.map(item => item.value));
    }
  };

  useEffect(() => {
    setSelectedOptions([]);
    setSelectedOptionsToShow([]);
  }, [options])

  useEffect(() => {
    if(onChange) {
      onChange(selectedOptions);
    }
  }, [selectedOptions])

  return (
    <div className='relative w-full flex flex-col md:flex-row items-center gap-3'>
      {label && (
        <div className='w-full md:w-36 text-sm font-semibold'>
          {label}
        </div>
      )}
      <div className='relative w-full md:grow'>  
        <label className='relative'>
          <input type='checkbox' className={`hidden ${!disabled && options.length && 'peer'}`} />
          <div className='w-full h-10 flex justify-between items-center cursor-pointer border rounded px-3'>
            <span className='text-sm'>
              {selectedOptionsToShow.length > 0 ? selectedOptionsToShow.join(', ') : title}
            </span>
            <DownOutlined className='text-sm' />
          </div>
          <div className='absolute top-10 w-full border border-gray-100 border-t-0 bg-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto peer- z-10'>
            <ul className='bg-white'>
              <li 
                key={crypto.randomUUID()} 
                onClick={handleSelectAllOptions}
                className='w-full px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
              >
                <input 
                  type='checkbox' 
                  checked={options.every(item => selectedOptions.includes(item.value))}
                  onChange={handleSelectAllOptions} 
                />
                <label>All</label>
              </li>
              {options.map(option => (
                <li 
                  key={crypto.randomUUID()} 
                  onClick={() => handleSelectOptions(option)}
                  className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
                >
                  <input 
                    type='checkbox' 
                    value={option.value} 
                    checked={selectedOptions.includes(option.value)}
                    onChange={() => handleSelectOptions(option)}
                  />
                  <label>{option.label}</label>
                </li>
              ))}
            </ul>
          </div>
        </label>
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