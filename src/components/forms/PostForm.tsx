'use client';

import React, { useEffect, useRef } from 'react'
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createPost, updatePost } from '@/lib/actions/post.actions';
import { IPost } from '@/lib/types/post.types';
import TextField from '../ui/TextField';
import UploadImageButton from '../ui/UploadImageBtn';
import DatePicker from '../ui/DatePicker';
import Select from '../ui/Select';
import { ICategory } from '@/lib/types/category.types';
import TextareaField from '../ui/TextareaField';
import SubmitButton from '../ui/SubmitButton';
import { openNotification } from '../ui/Notification';


interface IPostForm {
  categories: ICategory[];
  postToUpdate?: IPost;
}

const initialEmptyState = {
  title: '',
  image: '',
  publicationDate: '',
  tags: [],
  content: '',
}

const PostForm: React.FC<IPostForm> = ({ categories, postToUpdate }) => {
  const action = postToUpdate ? updatePost : createPost;
  const initialState = postToUpdate ? postToUpdate : initialEmptyState;
  const categoriesData = categories.map(category => ({ label: category.name, value: category._id! }));

  const router = useRouter();
  const [state, formAction] = useFormState(action, initialState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if(state && state.error) {
      openNotification(state.message, state.error);
    }

    if(!state.error && state.message) {
      ref.current?.reset();
      router.push('/dashboard/posts');
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
        title='Select a category'
        options={categoriesData} 
        multiple
        defaultValue={postToUpdate?.tags.map((item: any) => item._id!).join(', ')!} 
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