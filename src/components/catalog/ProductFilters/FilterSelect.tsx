'use client';

import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DownOutlined } from '@ant-design/icons';


interface IFilterSelect {
  name: string;
  title: string;
  options: {
    value: string;
    label: string;
  }[];
}


const FilterSelect: React.FC<IFilterSelect> = ({ name, title, options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectOpen = () => {
    setIsOpen(prev => !prev);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      params.set('page', '1');
      return params.toString()
    },
    [searchParams]
  );

  const isValueChecked = (value: string) => {
    const currentSearchParams = searchParams.get(name);
    if(currentSearchParams) {
      const splittedSearchParams = currentSearchParams.split(';');
      return splittedSearchParams.includes(value);
    } else {
      return false;
    }
  };

  const handleOptionSelect = (value: string) => {
    const currentParams = searchParams.get(name);
    if(currentParams) {
      const splittedSearchParams = currentParams.split(';');
      const isValueChecked = splittedSearchParams.includes(value);

      if(isValueChecked) {
        const newSearchParams = splittedSearchParams.filter(item => item !== value).join(';');
        const newPathname = newSearchParams.length > 0 ? 
          `${pathname}?${createQueryString(name, newSearchParams)}` : 
          pathname;
        router.push(newPathname);
      } else {
        const newSearchParams = [...splittedSearchParams, value].join(';');
        router.push(`${pathname}?${createQueryString(name, newSearchParams)}`)
      }
    } else {
      router.push(`${pathname}?${createQueryString(name, value)}`);
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
                  checked={isValueChecked(option.value)}
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