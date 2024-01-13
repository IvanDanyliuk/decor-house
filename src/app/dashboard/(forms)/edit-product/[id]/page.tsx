import ProductForm from '@/components/forms/ProductForm';
import { getCategories } from '@/lib/queries/category.queries';
import { getProduct } from '@/lib/actions/product.actions';
import { getManufacturers } from '@/lib/queries/manufacturers.queries';


const UpdateProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const categories = await getCategories({});

  const manufacturers = await getManufacturers({});

  const productData = await getProduct(id);
  const product = JSON.parse(JSON.stringify(productData.data));
  
  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>Update Product</h2>
      </section>
      <section className='container mx-auto py-10 box-border'>
        {categories.data && manufacturers.data && productData && (
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