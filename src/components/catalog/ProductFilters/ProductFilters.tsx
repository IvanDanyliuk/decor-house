import { Select } from 'antd';
import FilterSelect from './FilterSelect';
import PriceFilter from './PriceFilter';
import { IProductFiltersData } from '@/lib/types/products.types';


interface IProductFilters {
  filtersData: IProductFiltersData;
  sortData: any;
}


const ProductFilters: React.FC<IProductFilters> = ({ filtersData, sortData }) => {
  const handleSortChange = (value: string) => {
    const parsedValue = JSON.parse(value);
    
  };

  return (
    <div className='w-full flex justify-between items-center'>
      <div className='flex gap-6'>
        <FilterSelect 
          name='types'
          title='Types' 
          options={filtersData.types} 
        />
        <FilterSelect 
          name='features'
          title='Features' 
          options={filtersData.features} 
        />
        <FilterSelect 
          name='manufacturers'
          title='Manufacturers' 
          options={filtersData.manufacturers} 
        />
        <PriceFilter 
          name='price'
          min={filtersData.price.min.toString()} 
          max={filtersData.price.max.toString()} 
        />
      </div>
      <Select 
        options={sortData}
        defaultValue={sortData[0].value}
        onChange={handleSortChange}
        className='w-52'
      />
    </div>
  );
};

export default ProductFilters;