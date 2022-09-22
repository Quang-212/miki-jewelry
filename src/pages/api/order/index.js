import Order from 'src/models/Order';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function handleGetOrder(req, res) {
  await dbConnect();
  const { method } = req;
  const { status, search, limit = 10, page = 0 } = req.query;

  try {
    switch (method) {
      case 'GET':
        const orders = await Order.find({
          status: status || { $nin: ['canceled'] },
          ...(search && { search: new RegExp(search) }),
        })
          .skip(limit * page)
          .limit(limit)
          .populate({ path: 'products.product', model: Product })
          .exec();

        return res.status(200).json({
          message: 'Tìm order: OK',
          code: 200,
          data: orders,
        });
      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default handleGetOrder;
