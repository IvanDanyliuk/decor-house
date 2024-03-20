'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';


const ResetFiltersButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('query');

  return (
    <Link 
      href={query ? pathname + '?query=' + query : pathname} 
      className='px-3 flex items-center gap-1 font-semibold'
    >
      Reset Filters
    </Link>
  );
};

export default ResetFiltersButton;