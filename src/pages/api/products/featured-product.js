import qs from 'qs';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function getProductList(req, res) {
  await dbConnect();
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        let { limit = 4, category = [] } = qs.parse(req.query);

        select = Object.entries(select).reduce((select, [field, value]) => {
          select[field] = +value;
          return select;
        }, {});

        const productList = await Product.find({
          ...(category && { category }),
          ...(search && { search: new RegExp(search) }),
        })
          .sort({ sold: -1 })
          .limit(+limit)
          .exec();

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
export default getProductList;
