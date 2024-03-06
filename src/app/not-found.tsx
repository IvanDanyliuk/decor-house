import Link from 'next/link';


const NotFoundPage = () => {
  return (
    <div className='relative w-full h-full'>
      <div className='w-full h-32 bg-main-bg' />
      <div className='container mx-auto grow flex flex-col justify-center items-center'>
        <p className='text-[14rem] text-main-bg font-black text-shadow-sm'>404</p>
        <p className='text-2xl text-gray-dark'>Page not found</p>
        <Link 
          href='/' 
          className='mt-6 px-8 py-2 border border-accent-dark rounded uppercase'
        >
          Back to Home page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;