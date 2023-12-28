'use client';

import { useEffect, useState } from 'react';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


interface ISelectField {
  name: string;
  label: string;
  title?: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string) => void;
  error?: string[];
}


const SelectField: React.FC<ISelectField> = ({ name, label, title, options, onChange, error }) => {
  const [value, setValue] = useState<string>('');
  const [valueToShow, setValueToShow] = useState<string>('');

  const handleValueChange = (optionValue: string) => {
    setValue(optionValue);
  };

  useEffect(() => {
    const option = options.find(item => item.value === value);
    const isValueExist = options.find(item => item.label === valueToShow);

    console.log('SELECT FIELD', {
      options, value, valueToShow
    })

    setValueToShow(option?.label!);

    if(onChange) {
      onChange(value);
    }

    if(valueToShow && !isValueExist) {
      setValue('');
      setValueToShow('');
    }
  }, [value, options]);

  return (
    <div className='relative w-full flex flex-col md:flex-row items-center gap-3'>
      {label && (
        <div className='w-full md:w-36 text-sm font-semibold'>
          {label}
        </div>
      )}
      <div className='relative w-full md:grow'>  
        <label className='relative w-full'>
          <input type='checkbox' className='hidden peer' /> 
          <div className='w-full h-10 flex justify-between items-center cursor-pointer border rounded px-3'>
            <span className='text-sm'>{valueToShow ? valueToShow : title}</span>
            <DownOutlined className='text-sm' />
          </div>
          <div className='absolute top-10 w-full border border-gray-100 border-t-0 bg-white transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto z-10'>
            <ul className='w-full max-h-56 overflow-y-scroll bg-white'>
              {options.map(option => (
                <li 
                  key={crypto.randomUUID()} 
                  onClick={() => handleValueChange(option.value)} 
                  className='px-6 py-3 flex items-center gap-3 hover:bg-gray-100 duration-150'
                >
                  <input 
                    name={name}
                    type='checkbox' 
                    value={option.value} 
                    checked={value === option.value}
                    onChange={() => handleValueChange(option.value)} 
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