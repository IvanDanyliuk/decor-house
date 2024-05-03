import type { Metadata } from 'next';
import { Divider } from 'antd';
import ResetFiltersButton from '@/components/catalog/ProductFilters/ResetFiltersButton';
import SelectedFilters from '@/components/catalog/ProductFilters/SelectedFilters';
import ProductsList from '@/components/catalog/ProductsList';
import SearchFilters from '@/components/catalog/search/SearchFilters';
import { getSearchFilterData } from '@/lib/queries/product.queries';
import { ICategory } from '@/lib/types/category.types';
import { IManufacturer } from '@/lib/types/manufacturer.types';


export const metadata: Metadata = {
  title: 'Search | Decor House',
  description: 'Decor House is a company that sells high-quality furniture and accessories'
}


const Search = async ({ params, searchParams }: any) => {
  const filterData = await getSearchFilterData();
  const categoryOptions = filterData.data.categories.map((item: ICategory) => ({ 
    label: item.name, 
    value: item.name.toLowerCase().replaceAll(' ', '-') 
  }));
  const typesOptions = searchParams.category ? 
    filterData
      .data
      .categories
      .find((item: ICategory) => item.name.toLowerCase() === searchParams.category.replaceAll('-', ' '))
      .types.map((item: string) => ({ label: item, value: item })) : 
    [];
  const manufacturerOptions = filterData.data.manufacturers.map((item: IManufacturer) => ({ label: item.name, value: item._id! }));

  return (
    <div className='w-full'>
      <section className='w-full py-6 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary text-center'>
          Search
        </h2>
      </section>
      <section className='container mx-auto p-3'>
        <SearchFilters 
          categories={categoryOptions} 
          types={typesOptions} 
          manufacturers={manufacturerOptions} 
          minPrice={filterData.data.minPrice} 
          maxPrice={filterData.data.maxPrice} 
        />
        <Divider className='my-3' />
        <div className='flex justify-between items-center'>
          <SelectedFilters manufacturers={manufacturerOptions} />
          <ResetFiltersButton />
        </div>
      </section>
      <section className='relative w-full container mx-auto box-border'>
        <ProductsList />
      </section>
    </div>
  );
};

export default Search;