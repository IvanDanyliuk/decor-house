'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const ResetFiltersButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const clearFilters = () => {

  }
  return (
    // <button type='button' onClick={clearFilters} className='flex items-center gap-1 font-semibold'>
    //   Reset Filters
    // </button>
    <Link href={pathname} className='flex items-center gap-1 font-semibold'>
      Reset Filters
    </Link>
  );
};

export default ResetFiltersButton;