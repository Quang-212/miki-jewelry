import dbConnect from 'src/utils/dbConnect';
import OrderCart from 'src/models/OrderCart';

async function handlerCart(req, res) {
  await dbConnect();
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        const itemCart = await OrderCart.find();
        return res.status(200).json({
          message: 'Thêm thành công sản phẩm vào giỏ hàng',
          code: 200,
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

export default handlerCart;
