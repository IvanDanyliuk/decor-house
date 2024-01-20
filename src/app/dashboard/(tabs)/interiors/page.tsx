import { getInteriors } from "@/lib/queries/interior.queries";


const Interiors = async ({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) => {
  const page = searchParams.page || 1;

  const { data } = await getInteriors({ page: +page, itemsPerPage: 10 });
  
  return (
    <div>Interiors</div>
  );
};

export default Interiors;