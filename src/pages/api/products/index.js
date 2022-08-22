import qs from 'qs';

import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

export default async function getProductList(req, res) {
  await dbConnect();

  let { limit = 10, page = 0, select = {}, category = '' } = qs.parse(req.query);

  select = Object.entries(select).reduce((select, [field, value]) => {
    select[field] = +value;
    return select;
  }, {});

  const { sort } = req.query;
  // console.log(sort);
  const sortField = {};
  switch (sort) {
    case 'price-up':
      sortField['stocks.price'] = 1;
      break;
    case 'price-down':
      sortField['stocks.price'] = -1;
      break;
    case 'new-product':
      sortField['createdAt'] = -1;
      break;
    case 'sale':
      sortField['discount'] = -1;
      break;
    default:
      sortField['name'] = 1;
  }
  // console.log(sortField);
  const productList = await Product.find({})
    .sort(sortField)
    .limit(+limit)
    .skip(page * +limit)
    .select(select)
    .exec();
  console.log(productList);
  const total = await Product.countDocuments();

  return res.status(200).json({ productList, total, perPage: +limit });
}
