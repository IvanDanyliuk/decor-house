import { notFound } from 'next/navigation';
import InteriorDetails from '@/components/interiors/InteriorDetails';
import { getInterior } from '@/lib/queries/interior.queries';


export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  const interior = await getInterior(params.id);
  return {
    title: {
      absolute: interior.data.title
    },
    description: interior.data.description
  };
};


const Interior = async ({ params }: { params: { id: string } }) => {
  const { data } = await getInterior(params.id);

  if(!data) {
    notFound()
  }

  return (
    <InteriorDetails interior={data} />
  );
};

export default Interior;