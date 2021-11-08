export const getMapKeyValueByIndex = (obj, idx) => {
  var key = Object.keys(obj)[idx];
  return obj[key];
};

const Measurements = (obj) => {
  var key = Object.keys(obj);
  return { key: obj[key] };
};

const countProperties = (obj) => {
  return Object.keys(obj).length;
};

/* const getMapKeyValueByIndex = (obj, idx) => {
  var key = Object.keys(obj)[idx];
  return { key: key, value: obj[key] };
};
 */
