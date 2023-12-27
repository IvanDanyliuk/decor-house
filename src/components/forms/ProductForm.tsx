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
import { IManufacturer } from '@/lib/types/manufacturer.types';
import { IProduct } from '@/lib/types/products.types';
import MultiSelectField from '../ui/MultiSelectField';
import { createProduct } from '@/lib/actions/product.actions';


interface IProductForm {
  categories: ICategory[];
  manufacturers: IManufacturer[];
  productToUpdate?: IProduct;
}

const initialEmptyState = {
  category: '',
  type: '',
  features: [],
  name: '',
  description: '',
  width: '',
  height: '',
  depth: '',
  manufacturer: '',
  characteristics: '',
  price: '',
  sale: '',
  images: [],
  colors: [],
}


const ProductForm: React.FC<IProductForm> = ({ categories, manufacturers, productToUpdate }) => {
  const action = productToUpdate ? updateCategory : createProduct;
  const initialState = productToUpdate ? productToUpdate : initialEmptyState;

  const categoriesData = categories.map(category => ({ label: category.name!, value: category._id! }));
  const manufacturersData = manufacturers.map(manufacturer => ({ label: manufacturer.name }));

  const router = useRouter();

  const [state, formAction] = useFormState(action, initialState);
  // const [types, setTypes] = useState<string[]>(categoryToUpdate?.types || []);
  // const [features, setFeatures] = useState<string[]>(categoryToUpdate?.features || []);
  const ref = useRef<HTMLFormElement>(null);

  // const addNewType = (type: string) => {
  //   setTypes([...types, type]);
  // };

  // const deleteType = (type: string) => {
  //   setTypes(types.filter(item => item !== type));
  // };

  // const addNewFeature = (feature: string) => {
  //   setFeatures([...features, feature]);
  // };

  // const deleteFeature = (feature: string) => {
  //   setFeatures(features.filter(item => item !== feature));
  // };

  // useEffect(() => {
  //   if(state.message) {
  //     ref.current?.reset();
  //     setTypes([]);
  //     setFeatures([]);

  //     if(categoryToUpdate) {
  //       router.push('/dashboard/categories');
  //     }
  //   }
  // }, [state, formAction]);

  return (
    <form 
      ref={ref} 
      action={formAction} 
      className='flex grow flex-1 flex-col justify-between content-between gap-6'
    >
      <fieldset className='flex flex-col gap-3'>
        <MultiSelectField 
          label='Category'
          name='category'
          title='Select a product category'
          options={categoriesData}
        />
      </fieldset>
      
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <SubmitButton label={productToUpdate ? 'Update' : 'Create'} />
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

export default ProductForm;