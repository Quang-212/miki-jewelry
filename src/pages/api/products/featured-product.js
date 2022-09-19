import qs from 'qs';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function featuredProduct(req, res) {
  await dbConnect();
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        let { limit = 4, page = 0 } = qs.parse(req.query);

        select = Object.entries(select).reduce((select, [field, value]) => {
          select[field] = +value;
          return select;
        }, {});

        const featuredProducts = await Product.find({
          ...(category && { category }),
          ...(search && { search: new RegExp(search) }),
        })
          .select({ image })
          .sort({ sold: -1 })
          .skip(+limit * +page)
          .limit(+limit)
          .exec();

        return res.status(200).json({
          message: 'OK',
          code: 200,
          data: {
            products: featuredProducts,
            total,
            page,
            pageSize: +limit,
            pageCount: Math.ceil(total / +limit),
          },
        });

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
export default featuredProduct;
