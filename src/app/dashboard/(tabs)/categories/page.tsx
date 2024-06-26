import { notFound } from 'next/navigation';
import CategoriesTable from '@/components/tables/CategoriesTable';
import Pagination from '@/components/ui/Pagination';
import { getCategories } from '@/lib/queries/category.queries';


const Categories = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;
  const { data } = await getCategories({ page: +page, itemsPerPage: 10 });

  if(!data) {
    notFound();
  }

  return (
    <>
      <CategoriesTable categories={data.categories} />
      <Pagination itemsCount={data.count} />
    </>
  );
};

export default Categories;