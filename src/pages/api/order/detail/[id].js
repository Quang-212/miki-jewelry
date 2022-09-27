import Order from 'src/models/Order';
import dbConnect from 'src/utils/dbConnect';

async function handleGetOrderByAccount(req, res) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        const order = await Order.findById(id);

        return res.status(200).json({
          message: 'OK',
          code: 200,
          data: order,
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
