import Link from 'next/link';
import InteriorDetails from '@/components/interiors/InteriorDetails';
import { getInterior } from '@/lib/queries/interior.queries';


const Interior = async({ params }: { params: { id: string } }) => {
  const interiorData = await getInterior(params.id);

  return (
    <>
      {interiorData ? (
        <InteriorDetails interior={interiorData.data} />
      ) : (
        <div>
          <p>
            {interiorData.error ? interiorData.error : 'Cannot find this interior'}
          </p>
          <Link href='/interiors' className='link-primary'>Go Back</Link>
        </div>
      )}
    </>
  );
};

export default Interior;