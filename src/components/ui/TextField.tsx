import { ChangeEvent } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';


interface TextFieldProps {
  label?: string;
  name: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string[]
}


const TextField: React.FC<TextFieldProps> = ({ label, name, type, value, defaultValue, required, onChange, error }) => {
  return (
    <div className='w-full flex flex-col md:flex-row items-center gap-3'>
      {label && (
        <label 
          htmlFor={name} 
          className='w-full md:w-36 text-sm font-semibold'
        >
          {label}
        </label>
      )}
      <div className='relative w-full md:grow'>
        <input 
          className={`px-3 h-10 w-full text-sm border ${error ? 'border-red-600' : 'border-gray-regular'} rounded`}
          id={name}
          type={type || 'text'} 
          name={name} 
          value={value}
          defaultValue={defaultValue} 
          onChange={onChange}
          required={required} 
        />
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

export default TextField;