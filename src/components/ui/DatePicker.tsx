import { ChangeEvent, useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DatePicker as Picker } from 'antd';
import dayjs from 'dayjs';


interface IDatePicker {
  label?: string;
  name: string;
  defaultValue?: string;
  error?: string[]
}


const DatePicker: React.FC<IDatePicker> = ({ name, label, defaultValue, error }) => {
  const [date, setDate] = useState<any>(dayjs(new Date().toUTCString()))

  return (
    <div className='w-full flex flex-col md:flex-row items-start gap-3'>
      <input 
        type='text' 
        name={name} 
        value={dayjs(date).toISOString()} 
        onChange={() => {}} 
        className='hidden' 
      />
      {label && (
        <label 
          htmlFor={name} 
          className='w-full md:w-36 h-10 flex items-center text-sm font-semibold'
        >
          <span>{label}</span>
        </label>
      )}
      <div className='relative w-full md:grow'>
        <div className='flex gap-3'>
          <Picker defaultValue={dayjs(defaultValue)} onChange={setDate} />
        </div>
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

export default DatePicker;