'use client';

import { usePathname } from 'next/navigation';
import NotFoundMessage from '@/components/ui/NotFoundMessage';


const NotFound = () => {
  const pathname = usePathname();
  const entityName = pathname.slice(pathname.lastIndexOf('/') + 1);
  const message = `${entityName[0].toUpperCase() + entityName.slice(1)} not found`;

  return (
    <NotFoundMessage message={message} />
  );
};

export default NotFound;