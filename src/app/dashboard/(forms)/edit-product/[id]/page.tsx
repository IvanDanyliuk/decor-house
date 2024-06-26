import ProductForm from '@/components/forms/ProductForm';
import { getCategories } from '@/lib/queries/category.queries';
import { getProduct } from '@/lib/queries/product.queries';
import { getManufacturers } from '@/lib/queries/manufacturers.queries';


const UpdateProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const categories = await getCategories({});
  const manufacturers = await getManufacturers({});
  const product = await getProduct(id);
  
  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>Update Product</h2>
      </section>
      <section className='px-3 md:px-0 container mx-auto py-3 md:py-10 box-border'>
        {categories.data && manufacturers.data && product && (
          <ProductForm 
            categories={categories.data.categories} 
            manufacturers={manufacturers.data.manufacturers} 
            productToUpdate={product} 
          />
        )}
      </section>
    </>
  );
};

export default UpdateProduct;