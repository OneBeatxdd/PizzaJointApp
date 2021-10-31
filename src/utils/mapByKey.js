export const mapByKey = (arr, key) => (arr ? arr.reduce((map, element) => ((map[element[key]] = element), map), {}) : {});
