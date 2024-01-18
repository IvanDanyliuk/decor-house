import PostForm from '@/components/forms/PostForm';
import { getCategories } from '@/lib/queries/category.queries';


const CreatePost: React.FC = async () => {
  const categories = await getCategories({});

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>New Post</h2>
      </section>
      <section className='container mx-auto py-10 flex-1 box-border'>
        <PostForm categories={categories.data.categories} />
      </section>
    </>
  );
};

export default CreatePost;