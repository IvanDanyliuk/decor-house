import { notFound } from 'next/navigation';
import UsersTable from '@/components/tables/UsersTable';
import Pagination from '@/components/ui/Pagination';
import { getUsers } from '@/lib/queries/user.queries';


const Users = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = +(searchParams.page!)|| 1;
  const { data } = await getUsers({ page, itemsPerPage: 10 });

  if(!data) {
    notFound();
  }

  return (
    <>
      <UsersTable users={data.users} />
      <Pagination itemsCount={data?.count!} />
    </>
  );
};

export default Users;