import { notFound } from 'next/navigation';
import InteriorDetails from '@/components/interiors/InteriorDetails';
import { getInterior } from '@/lib/queries/interior.queries';


const Interior = async({ params }: { params: { id: string } }) => {
  const { data } = await getInterior(params.id);

  if(!data) {
    notFound()
  }

  return (
    <InteriorDetails interior={data} />
  );
};

export default Interior;