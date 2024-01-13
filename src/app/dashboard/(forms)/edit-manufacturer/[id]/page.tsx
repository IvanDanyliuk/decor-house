import ManufacturerForm from '@/components/forms/ManufacturerForm';
import { getManufacturer } from '@/lib/queries/manufacturers.queries';


const UpdateManufacturer = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const manufacturer = await getManufacturer(id);

  console.log('MANUFACTURER TO UPDATE', manufacturer)

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>Update Manufacturer</h2>
      </section>
      <section className='container mx-auto py-10 box-border'>
        {manufacturer.data && (
          <ManufacturerForm manufacturerToUpdate={manufacturer.data} />
        )}
      </section>
    </>
  );
};

export default UpdateManufacturer;