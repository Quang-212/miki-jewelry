import Order from 'src/models/Order';
import dbConnect from 'src/utils/dbConnect';

async function handleGetUserCart(req, res) {
  await dbConnect();
  const { method } = req;
  const { user } = req.query;
  try {
    switch (method) {
      case 'GET':
        const receipt = await Order.find({ user });
        return res.status(200).json({
          message: 'tìm kiếm order thành công',
          code: 200,
          receipt,
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
