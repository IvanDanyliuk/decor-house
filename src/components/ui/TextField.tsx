import React, { ChangeEvent } from 'react';


interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}


const TextField: React.FC<TextFieldProps> = ({ label, name, value, type, required, onChange }) => {
  return (
    <div className='w-full flex items-center gap-3'>
      <label htmlFor={name} className='w-36 text-sm font-semibold'>{label}</label>
      <input 
        className='px-3 h-10 grow text-sm border border-gray-regular rounded'
        id={name}
        type={type || 'text'} 
        name={name} 
        value={value} 
        required={required} 
        onChange={onChange} 
      />
    </div>
  );
};

export default TextField;