const searchByQuery = ({ router, limit, page, search, category, sortBy, order }) => {
  const path = router.pathname;
  const query = router.query;

  //! BULL SHIT KHOI!! IF PAGE === 0 => FALSY !!!
  if (page) query.page = page;
  else query.page = 0;

  if (limit) query.limit = limit;
  if (search) query.search = search;
  if (category) query.category = category;
  if (sortBy) query.sortBy = sortBy;
  if (order) query.order = order;

  router.push({
    pathname: path,
    query: query,
  });
};

export default searchByQuery;
