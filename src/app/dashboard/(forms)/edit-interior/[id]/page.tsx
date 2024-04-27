import InteriorForm from "@/components/forms/InteriorForm";
import { getCategories } from "@/lib/queries/category.queries";
import { getInterior } from "@/lib/queries/interior.queries";


const UpdateInterior = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data } = await getInterior(id);
  const categories = await getCategories({});

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>Update Interior</h2>
      </section>
      <section className='px-3 md:px-0 container mx-auto py-3 md:py-10 box-border'>
        {data && (
          <InteriorForm 
            categories={categories.data .categories} 
            interiorToUpdate={data} 
          />
        )}
      </section>
    </>
  );
};

export default UpdateInterior;