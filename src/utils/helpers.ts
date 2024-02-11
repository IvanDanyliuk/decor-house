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
}