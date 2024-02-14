'use client';

import { FocusEvent, useEffect, useState } from 'react';
import { InputNumber, Modal, Slider } from 'antd';
import { DownOutlined } from '@ant-design/icons';


interface IPriceValues {
  min: number;
  max: number;
}

interface IPriceFilter {
  min: number;
  max: number;
  onChange: (values: IPriceValues) => void;
}

const PriceFilter: React.FC<IPriceFilter> = ({ min, max, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [values, setValues] = useState<IPriceValues>({ min, max });

  const handlePriceRangeModalOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSliderValuesChange = (range: number[]) => {
    setValues({
      min: range[0],
      max: range[1],
    });
  };

  useEffect(() => {
    onChange(values);
  }, [values]);

  return (
    <>
      <button 
        onClick={handlePriceRangeModalOpen} 
        className='flex items-center gap-1 text-sm font-semibold border-none'
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
                  min: +e.target.value!
                })
              }} 
              className='flex-1'
            />
            <InputNumber 
              value={values.max} 
              onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
                setValues({
                  ...values,
                  max: +e.target.value!
                })
              }} 
              className='flex-1'
            />
          </div>
          <Slider 
            range 
            min={min} 
            max={max} 
            step={1}
            value={[values.min, values.max]} 
            onAfterChange={handleSliderValuesChange} 
          />
        </div>
      </Modal>
    </>
  )
}

export default PriceFilter