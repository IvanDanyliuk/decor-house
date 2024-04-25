'use client';

import { usePathname } from 'next/navigation';
import NotFoundMessage from '@/components/ui/NotFoundMessage';


const NotFoundPage = () => {
  const pathname = usePathname();

  return (
    <NotFoundMessage pathname={pathname} />
  );
};

export default NotFoundPage;