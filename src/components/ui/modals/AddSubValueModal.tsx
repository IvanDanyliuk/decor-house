'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextField from '../TextField';


interface IAddSubValueModal { 
  title: string;
  onAddNewValue: (type: string) => void;
}

const AddSubValueModal: React.FC<IAddSubValueModal> = ({ title, onAddNewValue }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string[] | undefined>(undefined);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleValueSubmit = () => {
    if(value) {
      onAddNewValue(value);
      setValue('');
      if(error) {
        setError(undefined);
      }
      setIsOpen(false);
    } else {
      setError(['Value is required']);
    }
  };

  useEffect(() => {
    if(!isOpen) setValue('');
  }, [isOpen]);

  return (
    <>
      <button 
        type='button'
        onClick={handleModalOpen} 
        className='w-8 h-8 flex justify-center items-center rounded-3xl bg-white hover:bg-accent-dark text-accent-dark hover:text-white duration-150'
      >
        <PlusOutlined />
      </button>
      <Modal
        title={title}
        open={isOpen}
        onCancel={handleModalOpen}
        footer={null}
      >
        <TextField 
          name='type' 
          value={value} 
          onChange={handleValueChange}
          error={error}
        />
        <button 
          type='button' 
          className='mt-3 w-full h-12 bg-accent-dark text-white uppercase rounded' 
          onClick={handleValueSubmit}
        >
          Add
        </button>
      </Modal>
    </>
  );
};

export default AddSubValueModal;