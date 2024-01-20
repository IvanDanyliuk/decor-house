import InteriorsTable from "@/components/tables/InteriorsTable";
import Pagination from "@/components/ui/Pagination";
import { getInteriors } from "@/lib/queries/interior.queries";


const Interiors = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  const { data } = await getInteriors({ page: +page, itemsPerPage: 10 });
  
  return (
    <>
      {data ? (
        <>
          <InteriorsTable interiors={data.interiors} />
          <Pagination itemsCount={data.count} />
        </>
      ) : (
        <div>Posts not found</div>
      )}
    </>
  );
};

export default Interiors;