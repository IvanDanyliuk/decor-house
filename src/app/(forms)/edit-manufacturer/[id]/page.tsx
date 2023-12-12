import ManufacturerForm from '@/components/forms/ManufacturerForm';
import { getManufacturer } from '@/lib/actions/manufacturer.actions';


const UpdateManufacturer = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data } = await getManufacturer(id);

  return (
    <div>
      {data && (
        <ManufacturerForm manufacturerToUpdate={data} />
      )}
    </div>
  );
};

export default UpdateManufacturer;