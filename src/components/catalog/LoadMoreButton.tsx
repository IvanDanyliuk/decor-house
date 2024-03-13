'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';


interface ILoadMoreButton {
  onSetPageNumber: (pageNumber: number) => void;
}

const LoadMoreButton: React.FC<ILoadMoreButton> = ({ onSetPageNumber }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLoadNextPage = () => {
    const url = new URLSearchParams(searchParams);
    const pageNumber = searchParams.get('page') || '1';
    url.set('page', Number(+pageNumber + 1).toString());
    onSetPageNumber(Number(pageNumber) + 1);
    router.push(`${pathname}?${url}`, { scroll: false })
  }

  return (
    <button 
      onClick={(e) => {
        e.preventDefault()
        handleLoadNextPage()
      }}
      className='w-full block mx-auto my-8 md:w-80 px-4 py-2 text-base font-semibold border border-accent-dark rounded-md'
    >
      View More
    </button>  
  );
};

export default LoadMoreButton;