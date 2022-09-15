import mongoose from 'mongoose';
import Cart from 'src/models/Cart';
import dbConnect from 'src/utils/dbConnect';

async function handleDeleteCart(req, res) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'DELETE':
        await Cart.findByIdAndUpdate(id, { status: 'deleted' });
        return res.status(200).json({
          message: 'Đã xóa sản phẩm khỏi giỏ hàng',
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

export default handleDeleteCart;
