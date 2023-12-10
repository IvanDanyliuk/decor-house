'use client';

import Image from 'next/image';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';


interface IAuthButton {
  session: Session | null
}

const AuthButton: React.FC<IAuthButton> = ({ session }) => {
  const user = session?.user;

  return (
    <button 
      className='mx-auto w-full h-12 flex justify-center items-center gap-3 border border-gray-light rounded'
      onClick={() => signIn('google', { ...user, callbackUrl: '/'})}
    >
      <Image src='/assets/images/google-icon-logo.svg' alt='Google' width={20} height={20} />
      <span className='text-sm'>Sign In with Google</span>
    </button>
  )
}

export default AuthButton