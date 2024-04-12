'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { Modal } from 'antd';
import { updatePassword } from '@/lib/actions/user.actions';
import TextField from '../ui/TextField';
import SubmitButton from '../ui/SubmitButton';
import { openNotification } from '../ui/Notification';


interface IUpdatePasswordModal {
  userId: string;
}


const UpdatePasswordModal: React.FC<IUpdatePasswordModal> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, formAction] = useFormState(updatePassword, {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const ref = useRef<HTMLFormElement>(null);

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if(state && state.error) {
      openNotification(state.message, state.error);
    }

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
        Update Password
      </button>
      <Modal
        open={isOpen}
        onCancel={handleModalOpen}
        footer={null}
        styles={{
          body: {
            paddingTop: '2rem'
          }
        }}
      >
        <form 
          ref={ref}
          action={async (formData: FormData) => {
            formData.append('id', userId);
            await formAction(formData);
          }}
          className='w-full flex flex-col items-center gap-6'
        >
          <TextField 
            name='currentPassword' 
            label='Current Password' 
            type='password' 
            error={state && state.error && state.error['currentPassword']}
          />
          <TextField 
            name='newPassword' 
            label='New Password' 
            type='password'  
            error={state && state.error && state.error['newPassword']}
          />
          <TextField 
            name='confirmPassword' 
            label='Confirm Password' 
            type='password'  
            error={state && state.error && state.error['confirmPassword']}
          />
          <SubmitButton label='Submit' />
        </form>
      </Modal>
    </>
  );
};

export default UpdatePasswordModal;