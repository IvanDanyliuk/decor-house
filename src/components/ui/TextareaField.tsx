import { ChangeEvent } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';


interface ITextareaField {
  label?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string[]
}


const TextareaField: React.FC<ITextareaField> = ({ label, name, value, defaultValue, rows, required, onChange, error }) => {
  return (
    <div className='w-full flex flex-col md:flex-row items-start gap-3'>
      {label && (
        <label 
          htmlFor={name} 
          className='w-full md:w-36 h-10 flex items-center text-sm font-semibold'
        >
          <span>{label}</span>
        </label>
      )}
      <div className='relative w-full md:grow'>
        <textarea 
          className={`px-3 w-full text-sm border ${error ? 'border-red-600' : 'border-gray-regular'} rounded`}
          id={name}
          name={name} 
          value={value}
          defaultValue={defaultValue} 
          onChange={onChange}
          rows={rows}
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

export default TextareaField;