import PostForm from '@/components/forms/PostForm';
import { getCategories } from '@/lib/actions/category.actions';
// import { getCategories } from '@/lib/queries/category.queries';


const CreatePost: React.FC = async () => {
  const categories = await getCategories({});

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='px-3 md:px-0 container mx-auto page-heading-primary'>New Post</h2>
      </section>
      <section className='px-3 md:px-0 container mx-auto py-3 md:py-10 flex-1 box-border'>
        <PostForm categories={categories.data.categories} />
      </section>
    </>
  );
};

export default CreatePost;