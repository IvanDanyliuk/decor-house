'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';


const ResetFiltersButton = () => {
  const pathname = usePathname();

  return (
    <Link 
      href={pathname} 
      className='px-3 flex items-center gap-1 font-semibold'
    >
      Reset Filters
    </Link>
  );
};

export default ResetFiltersButton;