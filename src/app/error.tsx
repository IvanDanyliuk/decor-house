'use client';

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error, 
  reset: () => void 
}) {
  console.log('ERROR DETAILED INFORMATION', error)
  return (
    <div className='w-full h-96 flex justify-center items-center'>
      <p className='text-center text-xl text-gray-700 font-bold'>Something went wrong...</p>
      <p className='text-center text-lg text-gray-600 font-semibold'>{error.message}</p>
      <button onClick={reset}>Try again!</button>
    </div>
  );
};