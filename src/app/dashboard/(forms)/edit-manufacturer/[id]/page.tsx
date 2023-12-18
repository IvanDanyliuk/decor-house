import ManufacturerForm from '@/components/forms/ManufacturerForm';
import { getManufacturer } from '@/lib/actions/manufacturer.actions';


const UpdateManufacturer = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data } = await getManufacturer(id);
  const parsedData = JSON.parse(JSON.stringify(data));

  return (
    <>
      <section className='w-full py-10 bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary'>Update Manufacturer</h2>
      </section>
      <section className='container mx-auto py-10 box-border'>
        {data && (
          <ManufacturerForm manufacturerToUpdate={parsedData} />
        )}
      </section>
    </>
  );
};

export default UpdateManufacturer;