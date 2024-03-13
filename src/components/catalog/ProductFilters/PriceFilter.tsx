'use client';

import { FocusEvent, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { InputNumber, Modal, Slider } from 'antd';
import { DownOutlined } from '@ant-design/icons';


interface IPriceValues {
  min: string;
  max: string;
}

interface IPriceFilter {
  name: string;
  min: string;
  max: string;
}


const PriceFilter: React.FC<IPriceFilter> = ({ name, min, max }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [values, setValues] = useState<IPriceValues>({ min, max });

  const createQueryString = useCallback(
    (minValue: string, maxValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('minPrice', minValue);
      params.set('maxPrice', maxValue);
      params.set('page', '1');
      return params.toString()
    },
    [searchParams]
  );

  const handlePriceRangeModalOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSliderValuesChange = (range: number[]) => {
    setValues({
      min: range[0].toString(),
      max: range[1].toString(),
    });
  };

  const handlePriceChangeComplete = (range: number[]) => {
    router.push(`${pathname}?${createQueryString(range[0].toString(), range[1].toString())}`);
  };

  useEffect(() => {
    const minPriceParams = searchParams.get('minPrice');
    const maxPriceParams = searchParams.get('maxPrice');
    setValues({
      min: minPriceParams || min,
      max: maxPriceParams || max
    })
  }, [searchParams]);

  return (
    <>
      <button 
        onClick={handlePriceRangeModalOpen} 
        className='flex items-center gap-3 text-sm font-semibold border-none'
      >
        <span>Price</span>
        <DownOutlined />
      </button>
      <Modal
        open={isOpen}
        centered
        closable
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={handlePriceRangeModalOpen}
      >
        <div className='f-full h-full px-3 pt-8'>
          <div className='mb-8 flex gap-3'>
            <InputNumber 
              value={values.min} 
              onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
                setValues({
                  ...values,
                  min: e.target.value!
                })
              }} 
              className='flex-1'
            />
            <InputNumber 
              value={values.max} 
              onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
                setValues({
                  ...values,
                  max: e.target.value!
                })
              }} 
              className='flex-1'
            />
          </div>
          <Slider 
            range 
            min={+min} 
            max={+max} 
            step={1}
            value={[+values.min, +values.max]} 
            onChange={handleSliderValuesChange}
            onAfterChange={handlePriceChangeComplete} 
          />
        </div>
      </Modal>
    </>
  );
};

export default PriceFilter;