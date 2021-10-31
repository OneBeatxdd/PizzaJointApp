const userInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  const firstChar = (str) => str.charAt(0).toUpperCase();
  return names.length > 1 ? `${firstChar(names[0])}${firstChar(names[1])}` : firstChar(names[0]);
};

module.exports = {
  userInitials,
};
