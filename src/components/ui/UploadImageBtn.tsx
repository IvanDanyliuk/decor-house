'use client';

import { useState, useRef } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';


interface IUploadImageButton {
  label: string;
  name: string;
  required?: boolean;
  multiple?: boolean;
  value?: string | string[];
  error?: string[]
}


const UploadImageButton: React.FC<IUploadImageButton> = ({ name, label, required, multiple, value, error }) => {
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    ref.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(Array.from(e.target.files ?? []));
  };

  console.log('SELECTED FILES', selectedFiles)

  return (
    <div className='w-full flex items-center gap-3'>
      <label htmlFor={name} className='w-full md:w-36 text-sm font-semibold'>{label}</label>
      <div className='relative w-full md:grow'>
        <div className='w-full flex gap-1 items-center  '>
          <button 
            type='button'
            className='w-36 h-10 bg-slate-500 text-sm text-white uppercase rounded'
            onClick={handleClick}
          >
            Upload
          </button>
          {value && selectedFiles.length === 0 ? (
            <>
              {Array.isArray(value) ? (
                <ul className='flex gap-3 text-xs'>
                  {value.map((image: string) => (
                    <li key={crypto.randomUUID()}>
                      <Image src={image} alt='Image' width={50} height={50} />
                    </li>
                  ))}
                </ul>
              ) : (
                <Image src={value} alt='Image' width={50} height={50} />
              )}
            </>
          ) : (
            <ul className='flex gap-3 text-xs'>
              {selectedFiles.map((file: any) => (
                <li key={crypto.randomUUID()}>{file.name}</li>
              ))}
            </ul>
            )}
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