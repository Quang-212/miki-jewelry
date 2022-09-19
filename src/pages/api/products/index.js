import qs from 'qs';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function getProductList(req, res) {
  await dbConnect();
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        let {
          limit = 10,
          page = 0,
          select = {},
          category = '',
          sortBy = 'createdAt',
          order = -1,
          search = '',
        } = qs.parse(req.query);

        const generateSort = (sortBy, order) => {
          if (sortBy == 'price') {
            return { 'stocks.price': order };
          }
          return { [sortBy]: order };
        };

        select = Object.entries(select).reduce((select, [field, value]) => {
          select[field] = +value;
          return select;
        }, {});

        const [productList, total] = await Promise.all([
          Product.find({
            ...(category && { category }),
            ...(search && { search: new RegExp(search) }),
          })
            .sort(generateSort(sortBy, order))
            .limit(+limit)
            .skip(page * +limit)
            .select(select)
            .exec(),
          Product.countDocuments(),
        ]);

        return res.status(200).json({
          message: 'OK',
          code: 200,
          data: {
            products: productList,
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
export default getProductList;
