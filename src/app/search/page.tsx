import SearchFilters from '@/components/catalog/search/SearchFilters';
import { getSearchFilterData } from '@/lib/queries/product.queries';
import { ICategory } from '@/lib/types/category.types';
import { IManufacturer } from '@/lib/types/manufacturer.types';


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
  
  console.log('SEARCH PAGE', typesOptions)

  return (
    <div className='container mx-auto py-3'>
      <SearchFilters 
        categories={categoryOptions} 
        types={typesOptions} 
        manufacturers={manufacturerOptions} 
        minPrice={filterData.data.minPrice} 
        maxPrice={filterData.data.maxPrice} 
      />
    </div>
  );
};

export default Search;