import Order from 'src/models/Order';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function handleGetOrderByAccount(req, res) {
  await dbConnect();
  const { method } = req;
  const { status, userId, search, limit = 10, page = 0 } = req.query;
  console.log(userId);
  try {
    switch (method) {
      case 'GET':
        const baseQuery = () => {
          return Order.find({
            user: userId,
            ...(status && status !== 'all' && { status }),
            ...(search && { search: new RegExp(search) }),
          });
        };

        const [orders, total] = await Promise.all([
          baseQuery()
            .skip(+limit * +page)
            .limit(+limit)
            .populate({
              path: 'products',
              populate: {
                path: 'product',
              },
            })
            .exec(),
          baseQuery().countDocuments(),
        ]);

        return res.status(200).json({
          message: 'Tìm order by account: OK',
          code: 200,
          data: {
            orders,
            total,
            page: +page,
            pageSize: +limit,
            pageCount: Math.ceil(total / limit),
          },
        });

      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default handleGetOrderByAccount;
