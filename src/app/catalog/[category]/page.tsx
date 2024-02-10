'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/queries/product.queries';
import { IProduct } from '@/lib/types/products.types';


const CategoryProducts = async ({ params }: { params: { category: string } }) => {
  const { category } = params;

  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsCount, setProductsCount] = useState<number>(0);

  useEffect(() => {
    getProducts({ page: 1, itemsPerPage: page * 12, category }).then(res => {
      setProducts(res.data.products);
      setProductsCount(res.data.count);
    });
  }, [page]);

  return (
    <div>
      
      <ul>
        {products.map(product => (
          <li key={crypto.randomUUID()}>
            {product.name}
          </li>
        ))}
      </ul>
      {productsCount > products.length && (
        <button onClick={() => setPage(page + 1)}>View More</button>
      )}
    </div>
  );
};

export default CategoryProducts;