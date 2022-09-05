const accessNestedObject = (obj, string) => {
  const arrayString = string.split('.');
  // console.log(arrayString);
  arrayString.forEach((item) => {
    if (obj?.[item]) {
      // console.log('obj: ', obj);
      // console.log('item: ', item);
      // console.log('item[obj]: ', obj[item]);
      obj = obj[item];
    }
  });
  return obj;
};

export default accessNestedObject;
