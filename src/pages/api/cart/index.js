import Cart from 'src/models/Cart';
import dbConnect from 'src/utils/dbConnect';

async function handleGetUserCart(req, res) {
  await dbConnect();
  const { method } = req;
  const { userId, limit = 10, page = 0 } = req.query;
  try {
    switch (method) {
      case 'GET':
        const cart = await Cart.find({ userId, status: { $nin: ['ordered', 'deleted'] } })
          .populate('product')
          .skip(limit * page)
          .limit(limit)
          .exec();

        return res.status(200).json({
          message: 'Tìm giỏ hàng: OK',
          code: 200,
          data: cart,
        });
      default:
        return res.status(404).json({
          message: 'Yêu cầu không hợp lệ',
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

export default handleGetUserCart;
