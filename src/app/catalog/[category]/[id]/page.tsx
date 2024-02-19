import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { viewProduct } from '@/lib/actions/user.actions';
import { getProduct } from '@/lib/queries/product.queries';


const page = async ({ params }: { params: { category: string, id: string } }) => {
  const { category, id } = params;

  const product = await getProduct(id);
  const session = await getServerSession();
  await viewProduct(session?.user?.email!, id);

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
      <section className='mx-auto container flex gap-6'>
        <div className='flex-1'>
          Images
        </div>
        <div className='flex-1'>
          Info
        </div>
      </section>
    </div>
  );
};

export default page;