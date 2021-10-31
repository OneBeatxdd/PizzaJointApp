export const obliterate = (obj, props) => {
  const map = { ...obj };
  props.forEach((prop) => {
    delete map[prop];
  });
  return map;
};
