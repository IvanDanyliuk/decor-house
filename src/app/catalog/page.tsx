import { getCategories } from '@/lib/queries/category.queries';
import { ICategory } from '@/lib/types/category.types';
import { splitArrayIntoChunks } from '@/utils/helpers';
import Image from 'next/image';


const Catalog = async () => {
  const { data } = await getCategories({});

  const categoriesChunks = splitArrayIntoChunks(data.categories, 5);

  return (
    <div className='relative w-full'>
      <div className='absolute top-0 w-full h-80 bg-main-bg' />
      <div className='relative pt-10 w-full'>
        <h2 className='mx-auto mb-10 text-4xl text-center font-bold uppercase'>
          Catalog
        </h2>
        <div className='container w-full mx-auto flex flex-col gap-6'>
          {/* <li 
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
          </li> */}
          {categoriesChunks.map((chunk: ICategory[], i) => {
            if(i % 2 !== 0) {
              return (
                <ul className='categories-container'>
                  {chunk.map(category => (
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
              )
            } else {
              return (
                <ul className='categories-container-reverse'>
                  {chunk.map(category => (
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
              )
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Catalog;