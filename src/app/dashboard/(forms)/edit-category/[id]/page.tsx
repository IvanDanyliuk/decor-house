import CategoryForm from '@/components/forms/CategoryForm';
import { getCategory } from '@/lib/actions/category.actions';


const UpdateCategory = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data } = await getCategory(id);
  const parsedData = JSON.parse(JSON.stringify(data));

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>Update Category</h2>
      </section>
      <section className='container mx-auto py-10 box-border'>
        {data && (
          <CategoryForm categoryToUpdate={parsedData} />
        )}
      </section>
    </>
  );
};

export default UpdateCategory;