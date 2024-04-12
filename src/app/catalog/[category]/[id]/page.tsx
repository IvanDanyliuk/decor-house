import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { getProduct, getRelatedProducts } from '@/lib/queries/product.queries';
import RelatedProducts from '@/components/catalog/RelatedProducts';
import ProductDetails from '@/components/catalog/ProductDetails';


const Product = async ({ params }: { params: { category: string, id: string } }) => {
  const { category, id } = params;
  const session = await getServerSession(); 
  const product = await getProduct(id);
  const relatedProducts = await getRelatedProducts(session?.user?.email!, 10, product.category);

  return (
    <div className='w-full'>
      <section className='w-full bg-main-bg'>
        <p className='container mx-auto mb-3 py-8 flex gap-1 text-sm font-semibold capitalize'>
          <Link href='/'>Home</Link>
          <span>/</span>
          <Link href='/catalog'>Catalog</Link>
          <span>/</span>
          {
            category !== 'undefined' && (
              <Link href={`/catalog/${category}`} className='capitalize'>{category}</Link>
            )
          }
        </p>
      </section>
      <section className='mx-auto container flex flex-col md:flex-row gap-6 md:gap-10'>
        {product && <ProductDetails product={product} />}
      </section>
      <section className='mx-auto mt-6 container'>
        {
          product && typeof product.category === 'string' && (
            <RelatedProducts categoryId={product.category!} products={relatedProducts} />
          )
        }
      </section>
    </div>
  );
};

export default Product;