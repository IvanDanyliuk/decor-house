'use client';

import { useFormStatus } from 'react-dom';


interface ISubmitButton {
  label: string;
  disabled?: boolean;
}


const SubmitButton: React.FC<ISubmitButton> = ({ label, disabled }) => {
  const { pending } = useFormStatus();

  return (
    <button 
      type='submit' 
      disabled={pending || disabled}
      className='w-full md:w-72 h-12 bg-accent-dark text-white uppercase rounded disabled:bg-gray-600'
    >
      {pending ? 'Loading...' : `${label}`}
    </button>
  );
};

export default SubmitButton;