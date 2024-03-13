'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { removeFalsyObjectFields } from '@/utils/helpers';
import { CloseOutlined } from '@ant-design/icons';


interface ISelectedFilters {
  manufacturers: {
    label: string;
    value: string;
  }[];
}

interface ISelectedFiltersState {
  types?: string;
  features?: string;
  manufacturers?: string;
}


const SelectedFilters: React.FC<ISelectedFilters> = ({ manufacturers }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedParams, setSelectedParams] = useState<ISelectedFiltersState>({});

  const handleFilterItemDelete = (key: keyof ISelectedFiltersState, value: string) => {
    const updatedValues = selectedParams[key]!.split(';').filter(item => item !== value);
    const newParams = new URLSearchParams(searchParams.toString());

    if(updatedValues.length > 0) {
      newParams.set(key, updatedValues.join(';'));
    } else {
      newParams.delete(key, value);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  useEffect(() => {
    const types = searchParams.get('types');
    const features = searchParams.get('features');
    const manufacturers = searchParams.get('manufacturers');
    
    const params = removeFalsyObjectFields({ types, features, manufacturers });
    setSelectedParams(params)
  }, [searchParams]);

  return (
    <ul className='flex flex-wrap gap-3'>
      {selectedParams.types && selectedParams.types.split(';').map(item => (
        <li 
          key={crypto.randomUUID()}
          className='px-3 py-2 flex gap-3 text-sm font-semibold bg-main-bg'
        >
          <span>{item}</span>
          <CloseOutlined onClick={() => handleFilterItemDelete('types', item)} />
        </li>
      ))}
      {selectedParams.features && selectedParams.features.split(';').map(item => (
        <li 
          key={crypto.randomUUID()}
          className='px-3 py-2 flex gap-3 text-sm font-semibold bg-main-bg'
        >
          <span>{item}</span>
          <CloseOutlined onClick={() => handleFilterItemDelete('features', item)} />
        </li>
      ))}
      {selectedParams.manufacturers && selectedParams.manufacturers.split(';').map(item => (
        <li 
          key={crypto.randomUUID()}
          className='px-3 py-2 flex gap-3 text-sm font-semibold bg-main-bg'
        >
          <span>{manufacturers.find(val => val.value === item)?.label}</span>
          <CloseOutlined onClick={() => handleFilterItemDelete('manufacturers', item)} />
        </li>
      ))}
    </ul>
  );
};

export default SelectedFilters;