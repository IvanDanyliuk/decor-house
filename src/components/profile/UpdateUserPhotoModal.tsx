'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { Modal } from 'antd';
import { updateUserPhoto } from '@/lib/actions/user.actions';
import UploadImageButton from '../ui/UploadImageBtn';
import SubmitButton from '../ui/SubmitButton';


interface IUpdateUserPhotoModal {
  userId: string;
}


const UpdateUserPhotoModal: React.FC<IUpdateUserPhotoModal> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, formAction] = useFormState(updateUserPhoto, '');
  const ref = useRef<HTMLFormElement>(null);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if(state && !state.error) {
      ref.current?.reset();
      setIsOpen(false);
    }
  }, [state, formAction]);

  return (
    <>
      <button 
        type='button'
        onClick={handleModalOpen} 
        className='w-52 h-10 bg-accent-dark text-white uppercase rounded'
      >
        Update Photo
      </button>
      <Modal
        open={isOpen}
        onCancel={handleModalOpen}
        footer={null}
      >
        <form 
          ref={ref}
          action={async (formData: FormData) => {
            formData.append('id', userId);
            await formAction(formData);
          }}
          className='flex flex-col gap-6'
        >
          <UploadImageButton 
            name='photo' 
            error={state && state.error && state.error['photo']!} 
          />
          <SubmitButton label='Submit' />
        </form>
      </Modal>
    </>
  );
};

export default UpdateUserPhotoModal;