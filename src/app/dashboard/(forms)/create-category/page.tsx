import CategoryForm from '@/components/forms/CategoryForm';


const CreateCategory: React.FC = () => {
  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>New Category</h2>
      </section>
      <section className='px-3 md:px-0 container mx-auto py-3 md:py-10 flex-1 box-border'>
        <CategoryForm />
      </section>
    </>
  );
};

export default CreateCategory;