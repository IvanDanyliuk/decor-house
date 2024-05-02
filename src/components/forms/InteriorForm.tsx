'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createInterior, updateInterior } from '@/lib/actions/interior.actions';
import { getProducts } from '@/lib/queries/product.queries';
import { ICategory } from '@/lib/types/category.types';
import { IInterior } from '@/lib/types/interior.types';
import { IProduct } from '@/lib/types/products.types';
import TextField from '../ui/TextField';
import UploadImageButton from '../ui/UploadImageBtn';
import TextareaField from '../ui/TextareaField';
import ProductSelect from '../ui/ProductSelect';
import SubmitButton from '../ui/SubmitButton';
import Select from '../ui/Select';
import { removeFalsyObjectFields } from '@/utils/helpers';
import { openNotification } from '../ui/Notification';
import { NotificationType } from '@/lib/common.types';


interface IInteriorForm {
  categories: ICategory[];
  interiorToUpdate?: IInterior;
}

const initialEmptyState = {
  title: '',
  description: '',
  image: '',
  products: '',
};


const InteriorForm: React.FC<IInteriorForm> = ({ categories, interiorToUpdate }) => {
  const action = interiorToUpdate ? updateInterior : createInterior;
  const initialState = interiorToUpdate ? interiorToUpdate : initialEmptyState;
  const categoriesOptions = categories.map(category => ({ label: category.name, value: category._id! }));

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [types, setTypes] = useState<{ label: string, value: string }[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  const [state, formAction] = useFormState(action.bind(null, {
    products: selectedProductIds.join(', '),
    interiorId: interiorToUpdate ? interiorToUpdate._id : null
  }), initialState);

  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const category = categories.find(item => item._id === selectedCategory);
    if(category) {
      const typeData = category.types.map(item => ({ label: item, value: item }));
      setTypes(typeData);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if(selectedCategory) {
      setIsLoading(true);

      const query = removeFalsyObjectFields({ 
        category: selectedCategory, 
        type: selectedType 
      });

      getProducts(query).then(res => {
        setProducts(res.data.products);
        setIsLoading(false);
      });
    }
  }, [selectedCategory, selectedType]);

  useEffect(() => {
    if(state && state.error) {
      openNotification(state.message, state.error, NotificationType.Error);
    }

    if(!state.error && state.message) {
      ref.current?.reset();
      setProducts([]);
      setSelectedProductIds([]);
      setSelectedCategory('');
      setTypes([]);
      setSelectedType('');
      openNotification('Done!', state.message);
      router.push('/dashboard/interiors');
    }
  }, [state, formAction]);

  return (
    <form 
      ref={ref}
      action={formAction} 
      className='flex grow flex-1 flex-wrap justify-between content-between gap-3 md:gap-6'
    >
      <TextField 
        name='title' 
        label='Title' 
        defaultValue={interiorToUpdate?.title} 
        error={state && state.error && state.error['title']}
      />
      <UploadImageButton 
        name='image' 
        label='Image' 
        defaultValue={interiorToUpdate?.image} 
        error={state && state.error && state.error['image']}
      />
      <TextareaField 
        name='description'
        label='Description'
        defaultValue={interiorToUpdate?.description}
        error={state && state.error && state.error['description']} 
      />
      <Select 
        label='Category' 
        title='Select a category'
        options={categoriesOptions} 
        onChange={setSelectedCategory} 
      />
      <Select 
        label='Type' 
        title='Select a type'
        options={types} 
        disabled={types.length === 0}
        onChange={setSelectedType} 
      />
      <ProductSelect 
        label={isLoading ? 'Loading...' : 'Add Products'}
        products={products} 
        defaultValue={interiorToUpdate?.products}
        onChange={setSelectedProductIds} 
      />
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <SubmitButton label={interiorToUpdate ? 'Update' : 'Create'} />
        <Link 
          href='/dashboard/interiors' 
          className='w-full md:w-72 h-12 link-primary uppercase'
        >
          <span>Go back to Dashboard</span>
        </Link>
      </div>
    </form>
  );
};

export default InteriorForm;