'use client';

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error, 
  reset: () => void 
}) {
  return (
    <div className='w-full h-96 flex flex-col justify-center items-center gap-3'>
      <p className='text-center text-xl text-gray-700 font-bold'>Something went wrong...</p>
      <p className='text-center text-lg text-gray-600 font-semibold'>{error.message}</p>
      <button onClick={reset} className='px-5 py-4 bg-accent-dark text-white uppercase rounded'>Try again!</button>
    </div>
  );
};