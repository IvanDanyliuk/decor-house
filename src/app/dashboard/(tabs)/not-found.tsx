'use client';

import { usePathname } from 'next/navigation';


const NotFound = () => {
  const pathname = usePathname();
  const entityName = pathname.slice(pathname.lastIndexOf('/') + 1)
  return (
    <div className='w-full h-96 flex justify-center items-center'>
      <p className='text-xl text-center text-gray-700 font-semibold text-shadow-sm'>
        {`${entityName[0].toUpperCase() + entityName.slice(1)} not found`}
      </p>
    </div>
  );
};

export default NotFound;