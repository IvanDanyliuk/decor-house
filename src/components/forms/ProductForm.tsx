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
import { createProduct } from '@/lib/actions/product.actions';
import TextareaField from '../ui/TextareaField';
import Select from '../ui/Select';
import ColorPicker from '../ui/ColorPicker';


interface IProductForm {
  categories: ICategory[];
  manufacturers: IManufacturer[];
  productToUpdate?: IProduct;
}

type SelectOption = {
  label: string,
  value: string,
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
  const initialState = productToUpdate ? initialEmptyState : initialEmptyState;

  const categoriesData = categories.map(category => ({ label: category.name!, value: category._id! }));
  const manufacturersData = manufacturers.map(manufacturer => ({ label: manufacturer.name, value: manufacturer._id }));

  const router = useRouter();

  const [state, formAction] = useFormState(action, initialState);
  const ref = useRef<HTMLFormElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [types, setTypes] = useState<SelectOption[]>([]);
  const [features, setFeatures] = useState<SelectOption[]>([]);

  useEffect(() => { 
    const data = categories.find(category => category._id === selectedCategory);
    const types = data?.types.map(type => ({ label: type, value: type }));
    const features = data?.features.map(feature => ({ label: feature, value: feature }));
    setTypes(types || []);
    setFeatures(features || []);
  }, [selectedCategory]);

  useEffect(() => {
    if(state?.message) {
      ref.current?.reset();
      setTypes([]);
      setFeatures([]);
      setSelectedCategory('');

      if(productToUpdate) {
        router.push('/dashboard/products');
      }
    }
  }, [state, formAction]);

  return (
    <form 
      ref={ref} 
      action={formAction} 
      className='flex grow flex-1 flex-wrap md:gap-10'
    >
      <fieldset className='w-full md:w-auto grow flex flex-col gap-3'>
        <Select 
          name='category'
          label='Category'
          title='Select a category'
          options={categoriesData}
          onChange={setSelectedCategory}
        />
        <Select 
          name='type'
          label='Type'
          title='Select a type'
          options={types}
        />
        <Select 
          name='features'
          label='Features'
          title='Select features'
          options={features}
          multiple
        />
        <TextField 
          name='name'
          label='Product Name'
          defaultValue={state.name}
          error={state && state.error && state.error['name']!}
        />
        <TextareaField 
          name='description'
          label='Description'
          defaultValue={state.description}
          error={state && state.error && state.error['description']!}
        />
      </fieldset>
      <fieldset className='w-full md:w-auto grow flex flex-col gap-3'>
        <TextField 
          name='width'
          label='Width'
          type='number'
          defaultValue={state.width}
          error={state && state.error && state.error['width']!}
        />
        <TextField 
          name='height'
          label='Height'
          type='number'
          defaultValue={productToUpdate && state.height}
          error={state && state.error && state.error['height']!}
        />
        <TextField 
          name='depth'
          label='Depth'
          type='number'
          defaultValue={state.depth}
          error={state && state.error && state.error['depth']!}
        />
        <Select 
          name='manufacturer'
          label='Manufacturer'
          title='Select a manufacturer'
          options={manufacturersData}
        />
        <TextareaField 
          name='characteristics'
          label='Characteristics'
          defaultValue={state.characteristics}
          error={state && state.error && state.error['characteristics']!}
        />
      </fieldset>
      <fieldset className='w-full md:w-auto grow flex flex-col gap-3'>
        <TextField 
          name='price'
          label='Price'
          type='number'
          defaultValue={state.price}
          error={state && state.error && state.error['price']!}
        />
        <TextField 
          name='sale'
          label='Sale'
          type='number'
          defaultValue={state.sale}
          error={state && state.error && state.error['sale']!}
        />
        <UploadImageButton 
          name='images'
          label='Images'
          multiple
        />
        <ColorPicker 
          name='color' 
          label='Colors' 
          title='Select colors' 
          multiple 
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