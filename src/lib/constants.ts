//AUTHENTICATION
export const PASSWORD_MIN_LENGTH = 6;

//TABLES
export const ITEMS_PER_TABLE_PAGE = 10;

//COMMON
export const MAX_IMAGE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const MAP_STARTING_POSITION = { 
  lat: 52.0192, 
  lng: 8.5301 
};

export const DISABLED_ARROW_COLOR = 'invert(62%) sepia(0%) saturate(1438%) hue-rotate(164deg) brightness(104%) contrast(73%)';

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

//PRODUCTS
export const productsSortItems = [
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'createdAt'
    }),
    label: 'Newest',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'price'
    }),
    label: 'Price: Low to High',
  },
  {
    value: JSON.stringify({
      order: 'desc',
      sortIndicator: 'price'
    }),
    label: 'Price: High to Low',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'name'
    }),
    label: 'Name: A-Z',
  },
  {
    value: JSON.stringify({
      order: 'desc',
      sortIndicator: 'name'
    }),
    label: 'Name: Z-A',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'size.width'
    }),
    label: 'Width',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'size.height'
    }),
    label: 'Height',
  },
  {
    value: JSON.stringify({
      order: 'asc',
      sortIndicator: 'size.depth'
    }),
    label: 'Depth',
  },
];