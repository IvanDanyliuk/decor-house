import Link from 'next/link';


const Hero: React.FC = () => {
  return (
    <div className=' hero object-fill rounded'>
      <img src='./assets/images/SOFA.png' alt='hero-bg' />
      <div className='absolute w-full h-full flex'>
        <div className='flex items-end hero-item'>
          <div className='pt-3 md:pt-6 pb-12 md:pb-0 bg-white'>
            <h1 className='mb-3 md:mb-0 homepage-heading-primary text-center'>
              Decor House
            </h1>
            <p className='my-6 hidden md:block'>
              We are design pioneers in the online world. Ever since we have grown continually into a medium-sized enterprise. The proud number of over 400,000 satisfied customers agrees with our pioneer work. 
            </p>
            <Link 
              href='/catalog' 
              className='absolute md:relative bottom-0 py-3 w-full link-primary'>
                Catalog
              </Link>
          </div>
        </div>
        <div className='hero-divider' />
        <div className='hidden md:block hero-item' />
        <div className='hidden md:block hero-divider' />
        <div className='hero-item' />
      </div>
    </div>
  );
};

export default Hero;