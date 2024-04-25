import { notFound } from 'next/navigation';
import ProductsTable from '@/components/tables/ProductsTable';
import Pagination from '@/components/ui/Pagination';
import { getProducts } from '@/lib/queries/product.queries';


const Products = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = +searchParams.page! || 1;
  
  const { data } = await getProducts({ page, itemsPerPage: 10 });

  if(!data) {
    notFound();
  }

  return (
    <>
      <ProductsTable products={data.products} />
      <Pagination itemsCount={data.count} />
    </>
  );
};

export default Products;