import CategoriesTable from '@/components/tables/CategoriesTable';
import Pagination from '@/components/ui/Pagination';
import { getCategories } from '@/lib/actions/category.actions';


const Categories = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  const { data } = await getCategories({ page: +page, itemsPerPage: 10 });
  const parsedData = JSON.parse(JSON.stringify(data));

  return (
    <>
      {parsedData ? (
        <>
          <CategoriesTable categories={parsedData!.categories} />
          <Pagination itemsCount={parsedData?.count!} />
        </>
      ) : (
        <div>Categories not found</div>
      )}
    </>
  );
};

export default Categories;