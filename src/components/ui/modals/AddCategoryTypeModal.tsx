'use client';

import { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextField from '../TextField';
import SubmitButton from '../SubmitButton';
import { useFormState } from 'react-dom';
import { addTypeValue } from '@/lib/actions/common.actions';


interface IAddCategoryModal {
  onAddCategoryType: (type: string) => void;
}

const AddCategoryModal: React.FC<IAddCategoryModal> = ({ onAddCategoryType }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, formAction] = useFormState(addTypeValue, {});
  const ref = useRef<HTMLFormElement>(null)

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if(state && typeof state === 'string') {
      onAddCategoryType(state);
      ref.current?.reset();
    }
  }, [state, formAction]);

  return (
    <>
      <button onClick={handleModalOpen}>
        <PlusOutlined />
      </button>
      <Modal
        title='Add new category'
        open={isOpen}
        onCancel={handleModalOpen}
        footer={null}
      >
        <form 
          action={formAction} 
          ref={ref}
          className='mt-6 flex flex-col items-center gap-6'
        >
          <TextField 
            name='type' 
            error={state && state.error && state.error['type']!}
          />
          <SubmitButton label='Add' />
        </form>
      </Modal>
    </>
  );
};

export default AddCategoryModal;