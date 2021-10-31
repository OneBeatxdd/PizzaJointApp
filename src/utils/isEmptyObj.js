export const isEmptyObj = (obj) => obj // 👈 null and undefined check 
&& Object.keys(obj).length === 0 && obj.constructor === Object;
