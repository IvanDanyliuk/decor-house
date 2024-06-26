import CategoryForm from '@/components/forms/CategoryForm';
import { getCategory } from '@/lib/queries/category.queries';


const UpdateCategory = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data } = await getCategory(id);

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>Update Category</h2>
      </section>
      <section className='px-3 md:px-0 container mx-auto py-3 md:py-10 box-border'>
        {data && (
          <CategoryForm categoryToUpdate={data} />
        )}
      </section>
    </>
  );
};

export default UpdateCategory;