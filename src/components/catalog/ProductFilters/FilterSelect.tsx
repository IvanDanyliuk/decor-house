'use client';

import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


interface IFilterSelect {
  name: string;
  title: string;
  options: {
    value: string;
    label: string;
  }[];
  selectedOptions: string[];
  // multiple?: boolean;
  // onChange: (key: string, values: string[]) => void;
}


const FilterSelect: React.FC<IFilterSelect> = ({ name, title, options, selectedOptions }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectOpen = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionSelect = (value: string) => {
    const isOptionSelected = selectedOptions.includes(value);
    const params = new URLSearchParams(searchParams);

    if(isOptionSelected) {
      const filteredOptions = selectedOptions.filter(option => option !== value).join(';');
      // onChange(name, filteredOptions);
      // params.set(name, )
      console.log('FILTER SELECT', { name, value })
    } else {
      // onChange(name, [...selectedOptions, value]);
      console.log('FILTER SELECT', { name, value })
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

export default FilterSelect;