import FilterSelect from './FilterSelect';
import PriceFilter from './PriceFilter';
import { ICheckedProductFilters, IPrice, IProductFiltersData } from '@/lib/types/products.types';


interface IProductFilters {
  filtersData: IProductFiltersData;
  // checkedFilters: ICheckedProductFilters;
  // onSetFilters: (key: string, values: string[] | IPrice) => void;
}


const ProductFilters: React.FC<IProductFilters> = ({ filtersData }) => {
  return (
    <div className='flex gap-6'>
      <FilterSelect 
        name='types'
        title='Types' 
        options={filtersData.types} 
        // selectedOptions={checkedFilters.types} 
        // multiple 
        // onChange={onSetFilters} 
      />
      <FilterSelect 
        name='features'
        title='Features' 
        options={filtersData.features} 
        // selectedOptions={checkedFilters.features} 
        // multiple 
        // onChange={onSetFilters} 
      />
      <FilterSelect 
        name='manufacturers'
        title='Manufacturers' 
        options={filtersData.manufacturers} 
        // selectedOptions={checkedFilters.manufacturers} 
        // multiple 
        // onChange={onSetFilters} 
      />
      {/* <PriceFilter 
        name='price'
        min={filtersData.price.min} 
        max={filtersData.price.max} 
        onChange={onSetFilters} 
      /> */}
    </div>
  );
};

export default ProductFilters;