'use client';

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';


const AuthButton: React.FC = () => {
  const { data: session } = useSession();

  if(session) {
    return (
      <>
        {session?.user?.name} 
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }

  return (
    <>
      Not Signed In
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
};

export default AuthButton;