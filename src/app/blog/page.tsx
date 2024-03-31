import BlogDetails from '@/components/blog/BlogDetails';
import { getCategories } from '@/lib/queries/category.queries';
import { ICategory } from '@/lib/types/category.types';
import React from 'react'

const Blog = async () => {
  const categories = await getCategories({});
  const categoriesData = categories.data.categories.length > 0 ? 
    categories.data.categories.map((category: ICategory) => ({ 
      label: category.name, 
      value: category._id })) : 
      [];

  return (
    <div className='relative w-full'>
      <section className='py-8 w-full bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary text-center'>
          Blog
        </h2>
      </section>
      <section className='container mx-auto px-3 md:px-0'>
        <BlogDetails categories={categoriesData} />
      </section>
    </div>
  );
};

export default Blog;