'use client';

import { ChangeEvent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DownOutlined } from '@ant-design/icons';


interface IFilterSelect {
  name: string;
  title: string;
  options: {
    value: string;
    label: string;
  }[];
  disabled?: boolean;
  multiple?: boolean;
}


const FilterSelect: React.FC<IFilterSelect> = ({ name, title, options, disabled, multiple }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectOpen = () => {
    if(!disabled) {
      setIsOpen(prev => !prev);
    }
  };

  const isValueChecked = (value: string) => {
    const currentSearchParams = searchParams.get(name);
    if(currentSearchParams) {
      const splittedSearchParams = currentSearchParams.split(';');
      return splittedSearchParams.includes(value);
    } else {
      return false;
    }
  };

  const handleOptionSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    const currentValues = searchParams.get(name);
    const params = new URLSearchParams(searchParams.toString());

    if(!checked) {
      const newValues = currentValues!.split(';').filter(item => item !== value).join(';');
      params.set(name, newValues!);
      params.set('page', '1')
    } else {
      const newValues = multiple ? (currentValues ? currentValues + ';' + value : value) : value;
      params.set(name, newValues);
      params.set('page', '1')
    }

    if(!params.get(name)) {
      params.delete(name);
      params.set('page', '1')
    }

    router.push(pathname + (pathname.toString() ? '?' + params.toString() : ''));
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
          className={`flex items-center gap-3 text-sm font-semibold ${disabled ? 'text-gray-regular' : ''}`}
          disabled={disabled}
        >
          <span>{title}</span>
          <DownOutlined />
        </button>
        {isOpen && options.length && (
          <ul className='w-fit absolute bg-white rounded z-30'>
            {options.map(option => (
              <li 
                key={crypto.randomUUID()} 
                className='px-6 py-3 hover:bg-gray-100 duration-150'
              >
                <label>
                  <input 
                    id={name}
                    name={name}
                    type='checkbox' 
                    value={option.value} 
                    checked={isValueChecked(option.value)}
                    onChange={handleOptionSelect} 
                    data-testid='selectProductCheckbox'
                  />
                  <span className='ml-3'>{option.label}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default FilterSelect;