'use client';

import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/lib/actions/post.action';
import { IPost } from '@/lib/types/post.types';
import TextField from '../ui/TextField';
import UploadImageButton from '../ui/UploadImageBtn';
import DatePicker from '../ui/DatePicker';
import Select from '../ui/Select';
import { ICategory } from '@/lib/types/category.types';
import { getCategories } from '@/lib/queries/category.queries';
import TextareaField from '../ui/TextareaField';
import SubmitButton from '../ui/SubmitButton';
import Link from 'next/link';


interface IPostForm {
  postToUpdate?: IPost;
}

const initialEmptyState = {
  title: '',
  image: '',
  publicationDate: '',
  tags: [],
  content: '',
}

const PostForm: React.FC<IPostForm> = ({ postToUpdate }) => {
  const action = postToUpdate ? updatePost : createPost;
  const initialState = postToUpdate ? postToUpdate : initialEmptyState;

  const router = useRouter();

  const [state, formAction] = useFormState(action, initialState);
  const [categories, setCategories] = useState<{label: string, value: string}[]>([]);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    getCategories({}).then(res => {
      const data = res.data.categories.map((category: ICategory) => ({ 
        label: category.name, 
        value: category._id 
      }));
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    if(state.message) {
      ref.current?.reset();
      router.push('/dashboard/posts');

      if(postToUpdate) {
        router.push('/dashboard/posts');
      }
    }
  }, [state, formAction]);

  return (
    <form 
      ref={ref} 
      action={formAction} 
      className='flex grow flex-1 flex-col justify-between content-between gap-6'
    >
      <TextField 
        name='title' 
        label='Title' 
        defaultValue={postToUpdate?.title} 
      />
      <UploadImageButton 
        name='image' 
        label='Image' 
        defaultValue={postToUpdate?.image} 
      />
      <DatePicker 
        name='publicationDate' 
        label='Publication Date' 
        defaultValue={postToUpdate?.publicationDate} 
      />
      <Select 
        name='tags' 
        label='Tags' 
        options={categories} 
        multiple
        defaultValue={typeof postToUpdate?.tags === 'string' ? postToUpdate?.tags : ''} 
      />
      <TextareaField 
        name='content' 
        label='Content' 
        defaultValue={postToUpdate?.content} 
      />
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <SubmitButton label={postToUpdate ? 'Update' : 'Create'} />
        <Link 
          href='/dashboard/posts' 
          className='w-full md:w-72 h-12 link-primary uppercase'
        >
          <span>Go back to Dashboard</span>
        </Link>
      </div>
    </form>
  );
};

export default PostForm;