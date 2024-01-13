export const getCategories = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  const searchParams = page && itemsPerPage ? `?page=${page}&itemsPerPage=${itemsPerPage}` : '';
  const data = await fetch(
    `${process.env.BASE_URL}/api/categories${searchParams}`, 
    { cache: 'no-store' 
  });
  return data.json();
};

export const getCategory = async (id: string) => {
  const data = await fetch(
    `${process.env.BASE_URL}/api/categories/${id}`, 
    { cache: 'no-store' }
  );
  return data.json();
};