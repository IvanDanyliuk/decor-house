import UsersTable from '@/components/tables/UsersTable';
import Pagination from '@/components/ui/Pagination';
import { getUsers } from '@/lib/queries/user.queries';


const Users = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = +(searchParams.page!)|| 1;
  const { data } = await getUsers({ page, itemsPerPage: 10 })

  return (
    <>
      {data ? (
        <>
          <UsersTable users={data.users} />
          <Pagination itemsCount={data?.count!} />
        </>
      ) : (
        <div>Users not found</div>
      )}
    </>
  );
};

export default Users;