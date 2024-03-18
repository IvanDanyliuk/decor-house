import ResetFiltersButton from '@/components/catalog/ProductFilters/ResetFiltersButton';
import SelectedFilters from '@/components/catalog/ProductFilters/SelectedFilters';
import SearchFilters from '@/components/catalog/search/SearchFilters';
import { getSearchFilterData, searchProducts } from '@/lib/queries/product.queries';
import { ICategory } from '@/lib/types/category.types';
import { IManufacturer } from '@/lib/types/manufacturer.types';
import { removeFalsyObjectFields } from '@/utils/helpers';
import { Divider } from 'antd';


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

  const page = searchParams.page || '1';
  const query = searchParams.query;
  const category = searchParams.category;
  const types = searchParams.types;
  const manufacturers = searchParams.manufacturers;

  // console.log('SEARCH PAGE', { page, query, category, types, manufacturers })

  const searchQuery = removeFalsyObjectFields({ page, itemsPerPage: 12, query, category, types, manufacturers });
  const searchedProducts = await searchProducts(searchQuery);

  return (
    <div className='w-full'>
      <section className='w-full py-6 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary text-center'>
          Search
        </h2>
      </section>
      <section className='container mx-auto py-3'>
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

      </section>
    </div>
  );
};

export default Search;