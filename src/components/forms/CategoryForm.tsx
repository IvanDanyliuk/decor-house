'use client';

import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { createCategory, updateCategory } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/types/category.types';
import TextField from '../ui/TextField';
import UploadImageButton from '../ui/UploadImageBtn';
import SubmitButton from '../ui/SubmitButton';
import AddCategoryTypeModal from '../ui/modals/AddCategoryTypeModal';


interface ICategoryForm {
  categoryToUpdate?: ICategory;
}

const initialEmptyState = {
  name: '',
  image: '',
  types: [],
  features: [],
}

const CategoryForm: React.FC<ICategoryForm> = ({ categoryToUpdate }) => {
  const action = categoryToUpdate ? updateCategory : createCategory;
  const initialState = categoryToUpdate ? categoryToUpdate : initialEmptyState;

  const [state, formAction] = useFormState(action, initialState);
  const [types, setTypes] = useState<string[]>([]);
  const ref = useRef<HTMLFormElement>(null);

  const addNewType = (type: string) => {
    setTypes([...types, type]);
  };

  const deleteType = (type: string) => {
    setTypes(types.filter(item => item !== type));
  };

  useEffect(() => {
    if(state && !state.error) {
      ref.current?.reset();
    }
  }, [state, formAction]);

  return (
    <div className='w-full flex flex-col md:flex-row gap-6'>
      <form ref={ref} action={formAction} className='grow'>
        <TextField 
          name='name' 
          label='Name' 
          defaultValue={state.name}
          error={state && state.error && state.error['name']!} 
        />
        <UploadImageButton 
          name='image' 
          label='Image' 
        />
        <SubmitButton label={categoryToUpdate ? 'Update' : 'Create'} />
      </form>
      <div className='relative w-full md:w-1/2'>
        <div className='w-full'>
          <div>
            <h6>Types</h6>
            <AddCategoryTypeModal onAddCategoryType={addNewType} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;