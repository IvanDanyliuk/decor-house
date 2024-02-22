import Link from 'next/link';
import { viewProduct } from '@/lib/actions/user.actions';
import { getProduct } from '@/lib/queries/product.queries';
import RelatedProducts from '@/components/catalog/RelatedProducts';
import ProductDetails from '@/components/catalog/ProductDetails';
import { getServerSession } from 'next-auth';


const page = async ({ params }: { params: { category: string, id: string } }) => {
  const { category, id } = params;
  const product = await getProduct(id);
  const session = await getServerSession();
  await viewProduct(session?.user?.email!, id)

  return (
    <div className='w-full'>
      <section className='w-full bg-main-bg'>
        <p className='container mx-auto mb-3 py-8 flex gap-1 text-sm font-semibold capitalize'>
          <Link href='/'>Home</Link>
          <span>/</span>
          <Link href='/catalog'>Catalog</Link>
          <span>/</span>
          <Link href={`/catalog/${category}`} className='capitalize'>{category}</Link>
        </p>
      </section>
      <section className='mx-auto container flex flex-col md:flex-row gap-6 md:gap-10'>
        <ProductDetails product={product} />
      </section>
      <section className='mx-auto mt-6 container'>
        {
          product && typeof product.category === 'string' && (
            <RelatedProducts categoryId={product.category!} />
          )
        }
      </section>
    </div>
  );
};

export default page;