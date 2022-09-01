import Order from 'src/models/Order';
import dbConnect from 'src/utils/dbConnect';

async function handleCreateOrder(req, res) {
  await dbConnect();
  const { method } = req;
  //const { user, cart, city, district, wards, strees, phone, payment } = req.body;
  try {
    switch (method) {
      case 'POST':
        const updateReceipt = await Order.create({ ...req.body, isPaid: true });
        return res.status(200).json({
          message: 'thanh toán thành công',
          code: 200,
          updateReceipt,
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

export default handleCreateOrder;
