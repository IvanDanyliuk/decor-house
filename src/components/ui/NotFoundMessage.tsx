import Link from 'next/link';

interface INotFoundMessage {
  pathname?: string;
  message?: string;
}


const NotFoundMessage: React.FC<INotFoundMessage> = ({ message, pathname }) => {
  const backUrl = pathname ? pathname.slice(0, pathname.lastIndexOf('/')) : '';

  return (
    <div className='relative w-full h-full'>
      <div className='w-full h-32 bg-main-bg' />
      <div className='container mx-auto grow flex flex-col justify-center items-center'>
        <p className='text-[14rem] text-main-bg font-black text-shadow-sm'>404</p>
        <p className='text-2xl text-gray-dark'>
          {
            message || 'Page not found'
          }
        </p>
        {pathname && (
          <Link 
            href={pathname.lastIndexOf('/') !== 0 ? backUrl : '/'} 
            className='mt-6 px-8 py-2 border border-accent-dark rounded uppercase'
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFoundMessage;