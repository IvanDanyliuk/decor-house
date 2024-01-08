'use client';

import { useState, useRef, useEffect } from 'react';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';


interface IUploadImageButton {
  label: string;
  name: string;
  required?: boolean;
  multiple?: boolean;
  defaultValue?: string;
  value?: string | string[];
  error?: string[]
}


const UploadImageButton: React.FC<IUploadImageButton> = ({ name, label, required, multiple = false, defaultValue, value, error }) => {
  const [selectedFiles, setSelectedFiles] = useState<any>(defaultValue || [])
  const ref = useRef<HTMLInputElement>(null);

  const convertFilesToString = (files: any[]) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      files.forEach((file: any) => {
        fileReader.readAsDataURL(file);
      });

      fileReader.onload = () => {
        resolve(fileReader.result);
      ;}

      fileReader.onerror = (error: any) => {
        reject(error);
      };
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    ref.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = await convertFilesToString(Array.from(e.target.files!));
    setSelectedFiles([...selectedFiles, newFiles])
  };

  const handleImageDelete = (value: any) => {
    console.log('DELETE VALUE', value)
    setSelectedFiles((prevState: any[]) => prevState.filter(url => typeof url === 'string' ? url !== value : url.name !== value.name));
  };

  useEffect(() => {
    console.log('SELECTED FILES', selectedFiles)
  }, [selectedFiles])

  return (
    <div className='w-full flex items-center gap-3'>
      <input name={name} type='text' value={selectedFiles.join('|-| ')} onChange={() => {}} className='hidden' />
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
            <>
              {defaultValue ? (
                <ul className='flex gap-3 text-xs'>
                  {selectedFiles.map((url: any) => (
                    <li key={crypto.randomUUID()} className='relative'>
                      <Image 
                        src={typeof url === 'string' ? url : URL.createObjectURL(url)} 
                        alt='Image' 
                        width={50} 
                        height={50} 
                      />
                      <button 
                        type='button' 
                        onClick={() => handleImageDelete(url)}
                        className='absolute top-0 right-0 w-5 h-5 flex justify-center items-center text-xs bg-white'
                      >
                        <CloseOutlined />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className='flex gap-3 text-xs'>
                  {selectedFiles.map((file: any) => (
                    <li key={crypto.randomUUID()} className='relative'>
                      {/* <Image 
                        src={URL.createObjectURL(file)} 
                        alt='Image' 
                        width={50} 
                        height={50} 
                      /> */}
                      <span></span>
                      <button 
                        type='button' 
                        onClick={() => handleImageDelete(file.name)}
                        className='absolute top-0 right-0 w-5 h-5 flex justify-center items-center text-xs bg-white'
                      >
                        <CloseOutlined />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
            )}
        </div>
        <input 
          ref={ref}
          className={`hidden h-10 w-full text-sm `}
          id={name}
          type='file'
          // name={name} 
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