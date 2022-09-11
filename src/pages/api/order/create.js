import Order from 'src/models/Order';
import dbConnect from 'src/utils/dbConnect';

async function handleCreateOrder(req, res) {
  await dbConnect();
  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        const updateReceipt = await Order.create(req.body);
        return res.status(200).json({
          message: 'order thành công',
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

export default handleCreateOrder;
