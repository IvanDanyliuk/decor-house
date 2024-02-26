'use client';

import { ChangeEvent, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';


interface IRadio {
  name?: string;
  options: {
    label: string;
    value: string;
  }[];
  error?: string[];
}


const Radio: React.FC<IRadio> = ({ name, options, error }) => {
  const [checkedValue, setCheckedValue] = useState<string>(options[0].value);

  const handleCheckedValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value);
  };

  return (
    <div className='flex gap-8'>
      {options.map(item => (
        <div key={crypto.randomUUID()} className='h-10 flex items-center gap-3 text-lg font-semibold'>
          <input 
            type='radio' 
            id={item.value} 
            name={name} 
            value={item.value} 
            checked={checkedValue === item.value} 
            onChange={handleCheckedValue} 
          />
          <label htmlFor={item.value}>
            {item.label}
          </label>
        </div>
      ))}
      <p className='mt-1 text-xs text-red-600'>
        {error && (
          <>
            <ExclamationCircleOutlined />
            <span className='ml-1'>{error.join(' ')}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default Radio;