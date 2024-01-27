import PostsTable from '@/components/tables/PostsTable';
import Pagination from '@/components/ui/Pagination';
import { getPosts } from '@/lib/queries/post.queries';


const Posts = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  const { data } = await getPosts({ page: +page, itemsPerPage: 10 });

  return (
    <>
      {data ? (
        <>
          <PostsTable posts={data.posts} />
          <Pagination itemsCount={data.count} />
        </>
      ) : (
        <div>Posts not found</div>
      )}
    </>
  );
};

export default Posts;