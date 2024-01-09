import React, { ChangeEvent, useEffect, useState } from 'react'
import { ColorPicker as Picker, Tag } from 'antd';
import { Color, ColorPickerProps } from 'antd/es/color-picker';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


interface IColorPicker {
  label?: string;
  name: string;
  title?:string;
  defaultValue?: string[];
  multiple?: boolean;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string[]
}


const ColorPicker: React.FC<IColorPicker> = ({ name, label, title, defaultValue, required, multiple = false, onChange, error }) => {
  const [color, setColor] = useState<Color | null>(null);
  const [format, setFormat] = useState<ColorPickerProps['format']>('hex');
  const [selectedColors, setSelectedColors] = useState<string>(defaultValue ? defaultValue.join(', ') : '');

  const handlePickedColorDelete = (value: string) => {
    const splittedColors = selectedColors.split(', ');
    const newState = splittedColors.filter(item => item !== value).join(', ');
    setSelectedColors(newState);
  };

  const clearSelectedColors = () => {
    setColor(null);
    setSelectedColors('');
  };

  useEffect(() => {
    if(color) {
      if(multiple) {
        const newState = selectedColors + `${selectedColors ? ', ' + color.toHexString().slice(0, 7) : color.toHexString().slice(0, 7)}`;
        setSelectedColors(newState);
      } else {
        setSelectedColors(color.toHexString().slice(0, 7));
      }
    }
  }, [color]);

  return (
    <div className='w-full flex flex-col md:flex-row items-start gap-3'>
      <input 
        type='text' 
        name={name} 
        value={selectedColors} 
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
          <Picker 
            value={color} 
            format={format} 
            onChange={setColor}
            onFormatChange={setFormat}
          >
            <button 
              type='button'
              className='w-36 h-10 bg-slate-500 text-sm text-white uppercase rounded'
            >
              {title || 'Select color'}
            </button>
          </Picker>
          {selectedColors && (
            <button 
              type='button' 
              onClick={clearSelectedColors} 
              className='px-3 py-1 text-sm text-gray-dark border rounded'
            >
              Clear colors
            </button>
          )}
        </div>
        {multiple && (
          <ul className='w-full md:max-w-xs mt-3 flex flex-wrap gap-3'>
            {selectedColors && selectedColors.split(', ').map(color => (
              <li 
                key={crypto.randomUUID()}
                className='px-3 py-2 flex gap-1 border rounded-full'
              >
                <Tag color={color} className='w-4 h-4 rounded-full' />
                <CloseOutlined className='text-sm' onClick={() => handlePickedColorDelete(color)} />
              </li>
            ))}
          </ul>
        )}
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

export default ColorPicker;