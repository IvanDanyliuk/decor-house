import ShopForm from '@/components/forms/ShopForm';
import { getShop } from '@/lib/queries/shop.queries';


const UpdateShop = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const shop = await getShop(id);

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>Update Shop</h2>
      </section>
      <section className='container mx-auto py-10 box-border'>
        {shop.data && (
          <ShopForm shopToUpdate={shop.data} />
        )}
      </section>
    </>
  );
};

export default UpdateShop;