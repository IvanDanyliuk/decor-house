'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCategory, updateCategory } from '@/lib/actions/category.actions';
import { ICategory } from '@/lib/types/category.types';
import TextField from '../ui/TextField';
import UploadImageButton from '../ui/UploadImageBtn';
import SubmitButton from '../ui/SubmitButton';
import AddSubValueModal from '../ui/modals/AddSubValueModal';
import Chip from '../ui/Chip';


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

  const router = useRouter();

  const [state, formAction] = useFormState(action, initialState);
  const [types, setTypes] = useState<string[]>(categoryToUpdate?.types || []);
  const [features, setFeatures] = useState<string[]>(categoryToUpdate?.features || []);
  const ref = useRef<HTMLFormElement>(null);

  const addNewType = (type: string) => {
    setTypes([...types, type]);
  };

  const deleteType = (type: string) => {
    setTypes(types.filter(item => item !== type));
  };

  const addNewFeature = (feature: string) => {
    setFeatures([...features, feature]);
  };

  const deleteFeature = (feature: string) => {
    setFeatures(features.filter(item => item !== feature));
  };

  useEffect(() => {
    if(state.message) {
      ref.current?.reset();
      setTypes([]);
      setFeatures([]);

      if(categoryToUpdate) {
        router.push('/dashboard/categories');
      }
    }
  }, [state, formAction]);

  return (
    <form 
      ref={ref} 
      action={async (formData: FormData) => {
        formData.append('types', types.join(', '));
        formData.append('features', features.join(', '));
        await formAction(formData);
      }} 
      className='flex grow flex-1 flex-col justify-between content-between gap-6'
    >
      <fieldset className='flex flex-col gap-3'>
        <TextField 
          name='name' 
          label='Name' 
          defaultValue={state.name}
          error={state && state.error && state.error['name']!} 
        />
        <UploadImageButton 
          name='image' 
          label='Image' 
          value={categoryToUpdate && categoryToUpdate.image || ''}
          error={state && state.error && state.error['image']}
        />
      </fieldset>
      <fieldset className='w-full'>
        <div className='w-full mb-6'>
          <div className='mb-3 w-full flex items-center'>
            <h6 className='mr-3 font-semibold text-sm'>Types</h6>
            <AddSubValueModal title='Add new category type' onAddNewValue={addNewType} />
          </div>
          {types.length > 0 && (
            <ul className='flex flex-wrap gap-3'>
              {types.map(type => (
                <li key={crypto.randomUUID()}>
                  <Chip 
                    text={type} 
                    onClose={() => deleteType(type)} 
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='w-full'>
          <div className='mb-3 w-full flex items-center'>
            <h6 className='mr-3 font-semibold text-sm'>Features</h6>
            <AddSubValueModal title='Add new category feature' onAddNewValue={addNewFeature} />
          </div>
          {features.length > 0 && (
            <ul className='flex flex-wrap gap-3'>
              {features.map(feature => (
                <li key={crypto.randomUUID()}>
                  <Chip 
                    text={feature} 
                    onClose={() => deleteFeature(feature)} 
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </fieldset>
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <SubmitButton label={categoryToUpdate ? 'Update' : 'Create'} />
        <Link 
          href='/dashboard/categories' 
          className='w-full md:w-72 h-12 link-primary uppercase'
        >
          <span>Go back to Dashboard</span>
        </Link>
      </div>
    </form>
  );
};

export default CategoryForm;