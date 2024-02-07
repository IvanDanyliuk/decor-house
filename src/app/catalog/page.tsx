import { getCategories } from '@/lib/queries/category.queries';
import { ICategory } from '@/lib/types/category.types';
import Image from 'next/image';


const Catalog = async () => {
  const { data } = await getCategories({});

  return (
    <div className='relative w-full'>
      <div className='absolute top-0 w-full h-80 bg-main-bg' />
      <div className='relative pt-10 w-full'>
        <h2 className='mx-auto mb-10 text-4xl text-center font-bold uppercase'>
          Catalog
        </h2>
        <ul className='container w-full h-screen mx-auto categories-container'>
          <li 
            key={crypto.randomUUID()}
            className='relative py-12 px-4'
          >
            <Image 
              src='/assets/images/top-quality.png'
              alt='top-quality' 
              quality={100}
              className='w-full h-full object-cover'
              fill
            />
            <div className='absolute bottom-0 h-full text-lg font-semibold uppercase'>
              Top Quality
            </div>
          </li>
          {data.categories.map((category: ICategory) => (
            <li 
              key={crypto.randomUUID()}
              className='relative py-12 px-4'
            >
              <Image 
                src={category.image} 
                alt={category._id!} 
                quality={100}
                className='w-full h-full object-cover'
                fill
              />
              <div className='absolute bottom-0 h-full text-lg font-semibold uppercase'>
                {category.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Catalog;