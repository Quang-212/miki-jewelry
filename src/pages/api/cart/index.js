import Cart from 'src/models/Cart';
import dbConnect from 'src/utils/dbConnect';

async function handleGetUserCart(req, res) {
  await dbConnect();
  const { method } = req;
  const { userId } = req.query;
  try {
    switch (method) {
      case 'GET':
        const cart = await Cart.findOne({ userId }).populate({ path: 'products.product' });
        return res.status(200).json({
          message: 'tìm kiếm giỏ hàng thành công',
          code: 200,
          cart,
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

export default handleGetUserCart;
