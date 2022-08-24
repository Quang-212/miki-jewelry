export function verifySort(handler) {
  return (req, res) => {
    const sortInstance = {};
    let initalSort = 1;
    if (req.query.hasOwnProperty('sortBy')) {
      if (req.query.sortBy != 'price') sortInstance[req.query.sortBy] = -initalSort;
      if (req.query.order == 'desc' && req.query.sortBy == 'price')
        sortInstance['stocks.price'] = -initalSort;
      else if (req.query.order == 'asc' && req.query.sortBy == 'price')
        sortInstance['stocks.price'] = initalSort;
    }
    req.sort = sortInstance;
    return handler(req, res);
  };
}

// export const config = {
//   matcher: '/about/:products',
// };
