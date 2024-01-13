export const getProducts = async ({ 
  page, 
  itemsPerPage, 
  category,
  manufacturer
}: { 
  page?: number, 
  itemsPerPage?: number, 
  category?: string;
  manufacturer?: string; 
}) => {
  const searchParams = page && itemsPerPage ? `?page=${page}&itemsPerPage=${itemsPerPage}` : '';
  const data = await fetch(
    `${process.env.BASE_URL}/api/products${searchParams}${category && '&category=' + category}${manufacturer && '&manufacturer=' + manufacturer}`, 
    { cache: 'no-store' }
  );
  return data.json();
};

export const getProduct = async (id: string) => {
  const data = await fetch(
    `${process.env.BASE_URL}/api/products/${id}`, 
    { cache: 'no-store' }
  );
  return data.json();
};