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
  const sortFild = {};
  switch (sort) {
    case 'price-up':
      sortFild['stocks.price'] = 1;
      break;
    case 'price-down':
      sortFild['stocks.price'] = -1;
      break;
    case 'new-product':
      sortFild['createdAt'] = -1;
      break;
    case 'sale':
      sortFild['discount'] = -1;
      break;
    default:
      sortFild['name'] = 1;
  }
  // console.log(sortFild);
  const productList = await Product.find({}, 'stocks.price name discount createdAt')
    .sort(sortFild)
    .limit(+limit)
    .skip(page * +limit)
    .select(select)
    .exec();

  const total = await Product.countDocuments();

  return res.status(200).json({ productList, total, perPage: +limit });
}
