'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createPromotion, updatePromotion } from '@/lib/actions/promotion.actions';
import { IPromotion } from '@/lib/types/propmotions.types';
import SubmitButton from '../ui/SubmitButton';
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
import { openNotification } from '../ui/Notification';


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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<{ label: string, value: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  useEffect(() => {
    getCategories({}).then(res => {
      const data = res.data.categories.map((item: ICategory) => ({ label: item.name, value: item.name.toLowerCase() }))
      setCategories(data)
    });
  }, []);

  useEffect(() => {
    if(selectedCategory) {
      setIsLoading(true);
      getProducts({ category: selectedCategory }).then(res => {
        setProducts(res.data.products);
        setIsLoading(false);
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if(state && state.error) {
      openNotification(state.message, state.error);
    }

    if(!state.error && state.message) {
      ref.current?.reset();
      setSelectedCategory('');
      setProducts([]);
      setSelectedProductIds([])
      router.push('/dashboard/promotions');
    }
  }, [state, formAction]);

  return (
    <form 
      ref={ref} 
      action={async (formData: FormData) => {
        formData.append('products', selectedProductIds.join(', '));
        await formAction(formData)
      }} 
      className='flex grow flex-1 flex-wrap justify-between content-between gap-3 md:gap-6'
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
      <fieldset className='w-full md:w-auto md:max-w-2xl grow flex flex-col gap-3 h-full max-h-full'>
        <Select 
          label='Product Category' 
          options={categories} 
          onChange={setSelectedCategory} 
        />
        <ProductSelect 
          label={isLoading ? 'Loading...' : 'Add Products'}
          products={products} 
          defaultValue={promotionToUpdate?.products}
          onChange={setSelectedProductIds} 
        />
      </fieldset>
      <div className='mt-6 w-full flex flex-col md:flex-row md:justify-between gap-5'>
        <SubmitButton label={promotionToUpdate ? 'Update' : 'Create'} />
        <Link 
          href='/dashboard/promotions' 
          className='w-full md:w-72 h-12 link-primary uppercase'
        >
          <span>Go back to Dashboard</span>
        </Link>
      </div>
    </form>
  );
};

export default PromotionForm;