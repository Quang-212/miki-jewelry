import qs from 'qs';

import { verifySort } from 'src/middlewares/verifySort';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function getProductList(req, res) {
  await dbConnect();
  const { method, sort } = req;
  try {
    switch (method) {
      case 'GET':
        let { limit = 10, page = 0, select = {}, category = '' } = qs.parse(req.query);

        select = Object.entries(select).reduce((select, [field, value]) => {
          select[field] = +value;
          return select;
        }, {});
        //tìm kiếm sản phẩm trong data
        const productList = await Product.find({})
          .sort(sort)
          .limit(+limit)
          .skip(page * +limit)
          .select(select)
          .exec();
        const total = await Product.countDocuments();
        return res.status(200).json({ productList, total, perPage: +limit });
      default:
        return res.status(404).json({
          message: 'Không tìm thấy yêu cầu hợp lệ',
          code: 404,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}
export default verifySort(getProductList);
