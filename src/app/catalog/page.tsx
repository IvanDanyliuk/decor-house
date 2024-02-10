import CategoriesListLayout from '@/components/catalog/CategoriesListLayout';
import { getCategories } from '@/lib/queries/category.queries';
import { ICategory, IPremiumCategory } from '@/lib/types/category.types';
import { splitArrayIntoChunks } from '@/utils/helpers';


const premiumCategory: IPremiumCategory = {
  _id: 'premium',
  name: 'Top Quality',
  image: '/assets/images/top-quality.png',
}

const chunkSize = 5;


const Catalog = async () => {
  const { data } = await getCategories({});
  data.categories.unshift(premiumCategory);
  const categoriesChunks = splitArrayIntoChunks(data.categories, chunkSize);

  return (
    <div className='relative w-full pb-6'>
      <div className='absolute top-0 w-full h-80 bg-main-bg' />
      <div className='relative pt-10 w-full'>
        <h2 className='mx-auto mb-10 text-4xl text-center font-bold uppercase'>
          Catalog
        </h2>
        <div className='container w-full mx-auto flex flex-col gap-3 md:gap-6'>
          {categoriesChunks.map((chunk: (ICategory | IPremiumCategory)[], i) => {
            if(chunk.length < chunkSize) {
              return (
                <CategoriesListLayout 
                  categories={chunk} 
                  className='rest-categories-container' 
                />
              );
            } else if(i % 2 !== 0) {
              return (
                <CategoriesListLayout 
                  categories={chunk} 
                  className='categories-container' 
                />
              );
            } else {
              return (
                <CategoriesListLayout 
                  categories={chunk} 
                  className='categories-container reverse' 
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Catalog;