import ProductForm from '@/components/forms/ProductForm';
import { getCategories } from '@/lib/actions/category.actions';
import { getManufacturers } from '@/lib/queries/manufacturers.queries';
// import { getManufacturers } from '@/lib/actions/manufacturer.actions';

import { ICategory } from '@/lib/types/category.types';


const CreateProduct: React.FC = async () => {
  const categories = await getCategories({});
  // const manufacturers = await getManufacturers({});
  const manufacturers = await getManufacturers({});

  console.log('CREATE PAGE MANUFACTURERS', manufacturers)

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>New Product</h2>
      </section>
      <section className='container mx-auto py-10 flex-1 box-border'>
        <ProductForm 
          categories={categories.data!.categories} 
          manufacturers={manufacturers.data!.manufacturers} 
        />
      </section>
    </>
  );
};

export default CreateProduct;