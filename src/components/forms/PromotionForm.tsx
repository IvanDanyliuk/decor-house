'use client';

import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { createPromotion, updatePromotion } from '@/lib/actions/promotion.actions';
import { IPromotion } from '@/lib/types/propmotions.types';
import { useEffect, useRef, useState } from 'react';
import SubmitButton from '../ui/SubmitButton';
import Link from 'next/link';
import TextField from '../ui/TextField';
import DatePicker from '../ui/DatePicker';
import UploadImageButton from '../ui/UploadImageBtn';
import TextareaField from '../ui/TextareaField';
import ProductSelect from '../ui/ProductSelect';
import Select from '../ui/Select';
import { ICategory } from '@/lib/types/category.types';
import { getCategories } from '@/lib/queries/category.queries';
import { getProducts } from '@/lib/queries/product.queries';
import { IProduct } from '@/lib/types/products.types';


interface IPromotionForm {
  promotionToUpdate?: IPromotion;
}

const initialEmptyState = {
  title: '',
  image: '',
  periodFrom: '',
  periodTo: '',
  description: ''
};


const PromotionForm: React.FC<IPromotionForm> = ({ promotionToUpdate }) => {
  const action = promotionToUpdate ? updatePromotion : createPromotion;
  const initialState = promotionToUpdate ? promotionToUpdate : initialEmptyState;

  const router = useRouter();
  const [state, formAction] = useFormState(action, initialState);
  const ref = useRef<HTMLFormElement>(null);

  const [categories, setCategories] = useState<{ label: string, value: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [products, setProducts] = useState<IProduct[]>([]);


  useEffect(() => {
    getCategories({}).then(res => {
      const data = res.data.categories.map((item: ICategory) => ({ label: item.name, value: item._id }))
      setCategories(data)
    });
  }, []);

  useEffect(() => {
    if(selectedCategory) {
      getProducts({ category: selectedCategory }).then(res => {
        setProducts(res.data.products)
      });
    }
  }, [selectedCategory]);

  return (
    <form 
      ref={ref} 
      action={formAction} 
      className='flex grow flex-1 flex-wrap justify-between content-between gap-6'
    >
      <fieldset className='w-full md:w-auto grow flex flex-col gap-3'>
        <TextField 
          name='title'
          label='Title'
          defaultValue={promotionToUpdate?.title!}
          required
          error={state && state.error && state.error['title']}
        />
        <DatePicker 
          name='periodFrom'
          label='Period From'
          defaultValue={promotionToUpdate?.periodFrom}
          error={state && state.error && state.error['eriodFrom']}
        />
        <DatePicker 
          name='periodTo'
          label='Period To'
          defaultValue={promotionToUpdate?.periodTo}
          error={state && state.error && state.error['periodTo']}
        />
        <UploadImageButton 
          name='image'
          label='Image'
          defaultValue={promotionToUpdate?.image}
          error={state && state.error && state.error['image']}
        />
        <TextareaField 
          name='description'
          label='Description'
          defaultValue={promotionToUpdate?.description}
          rows={6}
          error={state && state.error && state.error['description']}
        />
      </fieldset>
      <fieldset className='w-full md:w-auto grow flex flex-col gap-3'>
        <Select label='Product Category' options={categories} onChange={setSelectedCategory} />
        <ProductSelect products={products} onChange={() => {}} />
      </fieldset>
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <SubmitButton label={promotionToUpdate ? 'Update' : 'Create'} />
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

export default PromotionForm;