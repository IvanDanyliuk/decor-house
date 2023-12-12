'use client';

import { useState, useRef } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';


interface IUploadImageButton {
  label: string;
  name: string;
  required?: boolean;
  multiple?: boolean;
  error?: string[]
}


const UploadImageButton: React.FC<IUploadImageButton> = ({ name, label, required, multiple, error }) => {
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    ref.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(Array.from(e.target.files ?? []));
  };

  return (
    <div className='w-full flex items-center gap-3'>
      <label htmlFor={name} className='w-36 text-sm font-semibold'>{label}</label>
      <div className='relative grow'>
        <div className='w-full flex gap-1 items-center  '>
          <button 
            type='button'
            className='w-36 h-10 bg-slate-500 text-sm text-white uppercase rounded'
            onClick={handleClick}
          >
            Upload
          </button>
          <ul className='flex gap-3 text-xs'>
            {selectedFiles.map((file: any) => (
              <li key={crypto.randomUUID()}>{file.name}</li>
            ))}
          </ul>
        </div>
        <input 
            ref={ref}
            className={`hidden h-10 w-full text-sm `}
            id={name}
            type='file'
            name={name} 
            required={required} 
            multiple={multiple}
            onChange={handleChange}
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

export default UploadImageButton;