import React from 'react';


const Posts = ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  // const { data } = await getPosts({ page: +page, itemsPerPage: 10 });

  return (
    // <>
    //   {data ? (
    //     <>
    //       <Posts posts={data.posts} />
    //       <Pagination itemsCount={data.count} />
    //     </>
    //   ) : (
        <div>Posts not found</div>
    //   )}
    // </>
  );
};

export default Posts;