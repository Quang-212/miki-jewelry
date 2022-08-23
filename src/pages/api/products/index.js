import qs from 'qs';

import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function getProductList(req, res) {
  await dbConnect();
  const { method } = req;
  const { sortBy, order } = req.query;
  try {
    switch (method) {
      case 'GET':
        let { limit = 10, page = 0, select = {}, category = '' } = qs.parse(req.query);

        select = Object.entries(select).reduce((select, [field, value]) => {
          select[field] = +value;
          return select;
        }, {});

        // khởi tạo 1 đối tượng
        const sortInstance = {};
        let initalSort = 1;
        if (order == 'desc') {
          initalSort = -1;
        }

        switch (sortBy) {
          case 'new':
            sortInstance['createdAt'] = -initalSort;
            break;
          case 'sale':
            sortInstance['discount'] = -initalSort;
            break;
          case 'price':
            sortInstance['stocks.price'] = initalSort;
            break;
          default:
            sortInstance['name'] = initalSort;
        }

        //tìm kiếm sản phẩm trong data
        const productList = await Product.find({}, 'discount stocks.price name images')
          .sort(sortInstance)
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
