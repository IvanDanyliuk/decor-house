'use client';

import { useState } from 'react';
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
  options: Option[];
  onChange: (value: string) => void;
  error?: string[];
}


const Select: React.FC<ISelect> = ({ name, label, title, disabled, options, onChange, error }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<Option | null>(null);

  const handleSelectOpen = () => {
    setIsOpen(prevState => !prevState);
  }

  const handleValueChange = (option: Option) => {
    setData(option);
    onChange(option.value);
    setIsOpen(false);
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
            {data?.label || title}
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
                  checked={data?.value! === option.value}
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