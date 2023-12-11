'use client';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


interface IPagination {
  itemsCount: number;
}

const Pagination: React.FC<IPagination> = ({ itemsCount }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page') || '1';

  const params = new URLSearchParams(searchParams);
  const hasPrev = (10 * (+page - 1)) > 0;
  const hasNext = (10 * (+page - 1) + 10) < itemsCount;

  const handleChangePage = (type: string) => {
    type === 'prev' ? 
      params.set('page', `${+page - 1}`) :
      params.set('page', `${+page + 1}`);

    console.log('BUTTONS', { hasPrev, hasNext })

    router.replace(`${pathname}?${params}`);
  }

  return (
    <div className='flex gap-6'>
      <button 
        disabled={!hasPrev} 
        onClick={() => handleChangePage('prev')}
      >
        <ArrowLeftOutlined />
      </button>
      <button 
        disabled={!hasNext} 
        onClick={() => handleChangePage('next')}
      >
        <ArrowRightOutlined />
      </button>
    </div>
  )
}

export default Pagination