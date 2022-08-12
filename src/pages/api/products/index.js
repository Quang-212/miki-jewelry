import qs from 'qs';

import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

export default async function getProductList(req, res) {
  await dbConnect();

  let { limit = 10, page = 0, select = {}, category = '' } = qs.parse(req.query);
  console.log(qs.parse(req.query));
  select = Object.entries(select).reduce((select, [field, value]) => {
    select[field] = +value;
    return select;
  }, {});

  const productList = await Product.find()
    .limit(+limit)
    .skip(page * +limit)
    .select(select)
    .exec();

  const total = await Product.countDocuments();

  return res.status(200).json({ productList, total, perPage: +limit });
}
