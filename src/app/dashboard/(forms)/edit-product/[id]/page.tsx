import ProductForm from '@/components/forms/ProductForm';
import { getCategories } from '@/lib/actions/category.actions';
import { getManufacturers } from '@/lib/actions/manufacturer.actions';
import { getProduct } from '@/lib/actions/product.actions';


const UpdateProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const categoriesData = await getCategories({});
  const categories = JSON.parse(JSON.stringify(categoriesData));

  const manufacturersData = await getManufacturers({});
  const manufacturers = JSON.parse(JSON.stringify(manufacturersData));

  const productData = await getProduct(id);
  const product = JSON.parse(JSON.stringify(productData.data));
  
  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>Update Product</h2>
      </section>
      <section className='container mx-auto py-10 box-border'>
        {categoriesData && manufacturersData && productData && (
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