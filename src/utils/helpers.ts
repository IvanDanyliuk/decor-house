import { months } from '@/lib/constants';

export const isEmailValid = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const removeFalsyObjectFields = (object: any) => {
  const res: any = {};
  Object.keys(object).forEach(key => {
    if(object[key]) {
      res[key] = object[key];
    }
  });
  return res;
};

export const splitArrayIntoChunks = (array: any[], chunkSize: number) => {
  const chunks = [];

  for(let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
};

export const setUrlString = (title: string) => {
  const splittedTitle = title.toLowerCase().split(' ').map(item => item.replace(/[^a-z0-9]/gi, ''));
  return splittedTitle.length > 1 ? splittedTitle.join('-') : splittedTitle[0];
};

export const getArrayUniqueItems = (array: any[], field: string) => {
  let mapObj = new Map();
  
  array.forEach(v => {
    let prevValue = mapObj.get(v[field])
    if(!prevValue || prevValue.type === "new"){
      mapObj.set(v[field], v)
    } 
  });

  return [...mapObj.values()];
};

export const formatPromotionPeriod = (from: string, to: string) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const fromMonth = months[fromDate.getMonth()];
  const toMonth = months[toDate.getMonth()];

  if(fromMonth === toMonth) {
    return `${fromMonth}, ${fromDate.getDate()} - ${toDate.getDate()}`;
  } else {
    return `${fromMonth}, ${fromDate.getDate()} - ${toMonth}, ${toDate.getDate()}`;
  }
};

export const formatDate = (dateString: string) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const date = new Date(dateString);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const countPromotionDaysLeft = (date: string) => {
  const datesDifference = new Date(date).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(datesDifference  / ( 1000 * 60 * 60 * 24));

  if(daysLeft < 0) {
    return 'The promotion is over';
  }

  return `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
};

export const generateColors = (numberOfColors: number) => {
  const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

  const getCharacter = (index: number) => {
    return hexCharacters[index];
  };

  const colors = [];

  for(let i = 0; i < numberOfColors; i++) {
    let hexColor = '#';
    for (let y = 0; y < 6; y++) {
      const randomPosition = Math.floor(Math.random() * hexCharacters.length);
      hexColor += getCharacter(randomPosition);
    };
    colors.push(hexColor);
  }

  return colors;
};