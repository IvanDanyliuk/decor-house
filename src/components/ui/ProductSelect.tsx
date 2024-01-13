'use client';

// import { getProducts } from '@/lib/actions/product.actions';
import { getProducts } from '@/lib/queries/product.queries';
import { IProduct } from '@/lib/types/products.types';
import { useCallback, useEffect, useState } from 'react';

interface IProductSelect {
  category: string;
  onChange: () => void;
}

const ProductSelect: React.FC<IProductSelect> = ({ category, onChange }) => {
  // const [products, setProducts] = useState<any[]>([]);

  const findProducts = useCallback(async (categoryId: string) => {
    const data = await getProducts({ category: categoryId });
    // setProducts(data.data?.products!);
    return data
  }, [category]);

  const products = findProducts(category)

  // useEffect(() => {
  //   const data = findProducts(category);
  //   console.log(data)
  // }, [category]);


  useEffect(() => {
    console.log('PRODUCTS SELECT', products)
  }, [products])

  return (
    <div>ProductSelect</div>
  );
};

export default ProductSelect;