export const getManufacturers = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  const data = await fetch(`${process.env.BASE_URL}/api/manufacturers${page && itemsPerPage ? `?page=${page}&itemsPerPage=${itemsPerPage}` : ''}`);
  return data.json();
};

export const getManufacturer = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  const data = await fetch(`${process.env.BASE_URL}/api/manufacturers${page && itemsPerPage ? `?page=${page}&itemsPerPage=${itemsPerPage}` : ''}`);
  return data.json();
};