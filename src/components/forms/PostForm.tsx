import React, { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/lib/actions/post.action';
import { IPost } from '@/lib/types/post.types';


interface IPostForm {
  postToUpdate: IPost;
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
  const [tags, setTags] = useState<string[]>([])
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if(state.message) {
      ref.current?.reset();
      setTags([])
      router.push('/dashboard/categories');

      if(postToUpdate) {
        router.push('/dashboard/categories');
      }
    }
  }, [state, formAction]);

  return (
    <form 
      ref={ref} 
      action={async (formData: FormData) => {
        formData.append('tags', tags.join(', '));
        await formAction(formData);
      }} 
      className='flex grow flex-1 flex-col justify-between content-between gap-6'
    >

    </form>
  );
};

export default PostForm;