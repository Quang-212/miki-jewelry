import qs from 'qs';

import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function getProductList(req, res) {
  await dbConnect();
  try {
    const { method } = req;
    switch (method) {
      case 'GET':
        let { limit = 10, page = 0, select = {}, category = '' } = qs.parse(req.query);

        select = Object.entries(select).reduce((select, [field, value]) => {
          select[field] = +value;
          return select;
        }, {});
        //lọc theo trường
        let sortType = 'desc';
        // sắp xếp sản phẩm theo danh mục
        const sortField = {};
        const { sortBy, order } = req.query;
        if (req.query.hasOwnProperty('order')) {
          sortField[sortBy] = order;
        } else {
          sortField[sortBy] = sortType;
        }
        //tìm kiếm sản phẩm trong data
        const productList = await Product.find({})
          .sort(sortField)
          .limit(+limit)
          .skip(page * +limit)
          .select(select)
          .exec();
        const total = await Product.countDocuments();
        return res.status(200).json({ productList, total, perPage: +limit });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}
export default getProductList;
