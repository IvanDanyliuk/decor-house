import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Divider } from 'antd';
import { getProductsFilterData, getRelatedProducts } from '@/lib/queries/product.queries';
import ProductFilters from '@/components/catalog/ProductFilters/ProductFilters';
import RelatedProducts from '@/components/catalog/RelatedProducts';
import ProductsList from '@/components/catalog/ProductsList';
import ResetFiltersButton from '@/components/catalog/ProductFilters/ResetFiltersButton';
import SelectedFilters from '@/components/catalog/ProductFilters/SelectedFilters';
import { productsSortItems } from '@/lib/constants';


export const generateMetadata = ({ params }: { params: { category: string } }) => {
  return {
    title: params.category[0].toUpperCase() + params.category.slice(1),
    description: `Explore all the available ${params.category} at Decor House`
  }
};


const CategoryProducts = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const session = await getServerSession();
  const filtersData = await getProductsFilterData(category);
  const relatedProducts = await getRelatedProducts(session?.user?.email!, 10);

  return (
    <div className='w-full'>
      <section className='w-full px-3 md:px-0 py-6 bg-main-bg'>
        <div className='container mx-auto mb-3 flex gap-1 text-sm font-semibold capitalize'>
          <Link href='/catalog'>Catalog</Link>
          <span>/</span>
          <p>{category}</p>
        </div>
        <h2 className='container mx-auto page-heading-primary'>
          {category.replaceAll('-', ' ')}
        </h2>
      </section>
      <section className='w-full container mx-auto px-3 md:px-0 py-6'>
        <ProductFilters 
          filtersData={filtersData} 
          sortData={productsSortItems}
        />
        <Divider />
        <div className='flex justify-between items-center'>
          <SelectedFilters manufacturers={filtersData.manufacturers} />
          <ResetFiltersButton />
        </div>
      </section>
      <section className='relative w-full container mx-auto box-border'>
        <ProductsList category={category} />
        <Divider />
      </section>
      <section className='w-full mx-auto container'>
        <RelatedProducts products={relatedProducts} />
      </section>
    </div>
  );
};

export default CategoryProducts;