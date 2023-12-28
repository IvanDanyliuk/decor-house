'use client';

import { ChangeEvent, useState } from 'react';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


interface ISelectField {
  name: string;
  label: string;
  title?: string;
  options: {
    label: string;
    value: string;
  }[];
  error?: string[];
}


const SelectField: React.FC<ISelectField> = ({ name, label, title, options, error }) => {
  const [value, setValue] = useState<string>('');

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className='relative w-full flex flex-col md:flex-row items-center gap-3 z-50'>
      {label && (
        <div className='w-full md:w-36 text-sm font-semibold'>
          {label}
        </div>
      )}
      <div className='relative w-full md:grow'>  
        <label className='relative'>
          <input type='checkbox' className='hidden peer' />
          <div className='w-full h-10 flex items-center gap-3 cursor-pointer border rounded px-5 py-2'>
            <span>{title}</span>
            <DownOutlined className='text-sm' />
          </div>
          <div className='absolute top-10 w-full bg-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto'>
            <ul className='w-full bg-white'>
              {options.map(option => (
                <li 
                  key={crypto.randomUUID()} 
                  onClick={() => setValue(option.value)} 
                  className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
                >
                  <input 
                    name={name}
                    type='checkbox' 
                    value={option.value} 
                    checked={value === option.value}
                    onChange={handleValueChange} 
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