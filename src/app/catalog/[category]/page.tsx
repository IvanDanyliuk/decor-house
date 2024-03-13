import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Divider } from 'antd';
import { getProductsFilterData, getRelatedProducts } from '@/lib/queries/product.queries';
import ProductFilters from '@/components/catalog/ProductFilters/ProductFilters';
import RelatedProducts from '@/components/catalog/RelatedProducts';
import ProductsList from '@/components/catalog/ProductsList';
import ResetFiltersButton from '@/components/catalog/ProductFilters/ResetFiltersButton';
import SelectedFilters from '@/components/catalog/ProductFilters/SelectedFilters';


const sortItems = [
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'createdAt'
    }),
    label: 'Newest',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'price'
    }),
    label: 'Price: Low to High',
  },
  {
    value: JSON.stringify({
      order: 'desc',
      sortIndicator: 'price'
    }),
    label: 'Price: High to Low',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'name'
    }),
    label: 'Name: A-Z',
  },
  {
    value: JSON.stringify({
      order: 'desc',
      sortIndicator: 'name'
    }),
    label: 'Name: Z-A',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'size.width'
    }),
    label: 'Width',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'size.height'
    }),
    label: 'Height',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'size.depth'
    }),
    label: 'Depth',
  },
];


const CategoryProducts = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const session = await getServerSession();
  const filtersData = await getProductsFilterData(category);
  const relatedProducts = await getRelatedProducts(session?.user?.email!, 10);

  return (
    <div className='w-full'>
      <section className='w-full py-6 bg-main-bg'>
        <div className='container mx-auto mb-3 flex gap-1 text-sm font-semibold capitalize'>
          <Link href='/catalog'>Catalog</Link>
          <span>/</span>
          <p>{category}</p>
        </div>
        <h2 className='container mx-auto page-heading-primary'>
          {category.replaceAll('-', ' ')}
        </h2>
      </section>
      <section className='w-full container mx-auto py-6'>
        <div className='w-full flex justify-between items-center'>
          <div className='w-full flex gap-6'>
            <ProductFilters 
              filtersData={filtersData} 
              sortData={sortItems}
            />
          </div>
        </div>
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
        {relatedProducts && (
          <RelatedProducts products={relatedProducts} />
        )}
      </section>
    </div>
  );
};

export default CategoryProducts;