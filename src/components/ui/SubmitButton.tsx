'use client';

import { useFormStatus } from 'react-dom';


interface ISubmitButton {
  label: string;
}


const SubmitButton: React.FC<ISubmitButton> = ({ label }) => {
  const { pending } = useFormStatus();

  return (
    <button 
      type='submit' 
      disabled={pending}
      className='w-full md:w-72 h-12 bg-accent-dark text-white uppercase rounded'
    >
      {pending ? 'Loading...' : `${label}`}
    </button>
  );
};

export default SubmitButton;