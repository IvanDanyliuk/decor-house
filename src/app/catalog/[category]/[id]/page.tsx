import { getCurrentUser, viewProduct } from '@/lib/actions/user.actions';
import { getUser } from '@/lib/queries/user.queries';
import { getServerSession } from 'next-auth';


const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession();
  const user = await getCurrentUser(session?.user?.email!);
  const userId = user.data._id
  await viewProduct(userId, id);

  return (
    <div>{id}</div>
  );
};

export default page;