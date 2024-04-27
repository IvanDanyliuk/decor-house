import ProductForm from '@/components/forms/ProductForm';
import { getCategories } from '@/lib/queries/category.queries';
import { getManufacturers } from '@/lib/queries/manufacturers.queries';


const CreateProduct: React.FC = async () => {
  const categories = await getCategories({});
  const manufacturers = await getManufacturers({});

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>New Product</h2>
      </section>
      <section className='px-3 md:px-0 container mx-auto py-3 md:py-10 flex-1 box-border'>
        <ProductForm 
          categories={categories.data!.categories} 
          manufacturers={manufacturers.data!.manufacturers} 
        />
      </section>
    </>
  );
};

export default CreateProduct;