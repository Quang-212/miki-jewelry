import Cart from 'src/models/Cart';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function handleGetUserCart(req, res) {
  await dbConnect();
  const { method } = req;
  const { userId, limit = 10, page = 0 } = req.query;
  try {
    switch (method) {
      case 'GET':
        const cart = await Cart.find({ userId, status: { $nin: ['ordered', 'deleted'] } })
          .skip(limit * page)
          .limit(limit)
          .populate({ path: 'product', model: Product })
          .exec();

        return res.status(200).json({
          message: 'Tìm giỏ hàng: OK',
          code: 200,
          data: cart,
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

export default handleGetUserCart;
