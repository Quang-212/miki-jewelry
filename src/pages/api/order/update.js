import Order from 'src/models/Order';
import dbConnect from 'src/utils/dbConnect';

async function handleUpdateOrder(req, res) {
  await dbConnect();
  const { method } = req;

  const { id } = req.query;

  try {
    switch (method) {
      case 'PATCH':
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body);
        if (!updatedOrder) {
          return res.status(400).json({
            message: 'Không tìm thấy order',
            code: 400,
          });
        }
        return res.status(200).json({
          message: 'Cập nhật order thành công',
          code: 200,
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

export default handleUpdateOrder;
