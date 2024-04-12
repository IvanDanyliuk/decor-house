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

  return (
    <>
      {data ? (
        <>
          <ProductsTable products={data.products} />
          <Pagination itemsCount={data.count} />
        </>
      ) : (
        <div>Products not found</div>
      )}
    </>
  );
};

export default Products;