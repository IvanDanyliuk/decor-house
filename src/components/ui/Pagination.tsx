'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ITEMS_PER_TABLE_PAGE } from '@/lib/constants';


interface IPagination {
  itemsCount: number;
}


const Pagination: React.FC<IPagination> = ({ itemsCount }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page') || '1';

  const params = new URLSearchParams(searchParams);
  const hasPrev = (ITEMS_PER_TABLE_PAGE * (+page - 1)) > 0;
  const hasNext = (ITEMS_PER_TABLE_PAGE * (+page - 1) + ITEMS_PER_TABLE_PAGE) < itemsCount;

  const handleChangePage = (type: string) => {
    type === 'prev' ? 
      params.set('page', `${+page - 1}`) :
      params.set('page', `${+page + 1}`);

    router.replace(`${pathname}?${params}`);
  };

  return (
    <div className='py-6 w-full flex justify-end'>
      <div className='flex gap-6'>
        <button 
          disabled={!hasPrev} 
          onClick={() => handleChangePage('prev')}
          className='w-auto md:w-24 h-8 hover:bg-gray-light rounded duration-500'
        >
          <ArrowLeftOutlined />
        </button>
        <button 
          disabled={!hasNext} 
          onClick={() => handleChangePage('next')}
          className='w-auto md:w-24 h-8 hover:bg-gray-light rounded duration-500'
        >
          <ArrowRightOutlined />
        </button>
      </div>
    </div>
  )
}

export default Pagination