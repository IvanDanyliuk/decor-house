'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { Avatar } from 'antd';
import { IUser } from '@/lib/types/user.types';
import { updateUser } from '@/lib/actions/user.actions';
import TextField from '../ui/TextField';
import UpdateUserPhotoModal from './UpdateUserPhotoModal';
import UpdatePasswordModal from './UpdatePasswordModal';
import SubmitButton from '../ui/SubmitButton';
import { useSession } from 'next-auth/react';


interface IUserTab {
  user: IUser;
}


const UserTab: React.FC<IUserTab> = ({ user }) => {
  const [state, formAction] = useFormState(updateUser, user);
  const { data: session, update } = useSession();

  console.log('USER TAB', user)

  useEffect(() => {
    if(state && !state.error) {
      update({ name: user.name, email: user.email, image: user.photo }).then(res => console.log('Session has been updated!'));
    }
  }, [state, formAction]);

  return (
    <div className='flex flex-col md:flex-row gap-10'>
      <div className='px-10 flex flex-col justify-center items-center w-auto gap-6'>
        <Avatar 
          src={user.photo} 
          alt='user_photo' 
          className='w-52 h-52' 
        />
        <UpdateUserPhotoModal userId={user._id!} />
        <UpdatePasswordModal userId={user._id!} />
      </div>
      <form action={formAction} className='flex flex-wrap md:flex-row flex-1 gap-6'>
        <fieldset className='flex flex-col flex-1 gap-3'>
          <TextField 
            name='name' 
            label='First Name and Last Name' 
            defaultValue={user.name} 
            error={state && state.error && state.error['name']!} 
          />
          <TextField 
            name='phone' 
            label='Phone' 
            defaultValue={user.phone} 
            error={state && state.error && state.error['phone']!} 
          />
          <TextField 
            name='email' 
            label='Email' 
            defaultValue={user.email} 
            error={state && state.error && state.error['email']!} 
          />
        </fieldset>
        <fieldset className='flex flex-col flex-1 gap-3'>
          <TextField 
            name='address' 
            label='Address' 
            defaultValue={user.address} 
            error={state && state.error && state.error['address']!} 
          />
        </fieldset>
        <fieldset className='w-full flex justify-end'>
          <SubmitButton label='Submit' />
        </fieldset>
      </form>
    </div>
  );
};

export default UserTab;