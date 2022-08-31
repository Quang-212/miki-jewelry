import Cart from 'src/models/Order';
import dbConnect from 'src/utils/dbConnect';

async function handleUpdateCart(req, res) {
  await dbConnect();
  const { method } = req;

  const { quantityType, adjust, id } = req.query;
  const { amount } = req.body;
  try {
    switch (method) {
      case 'PATCH':
        if (quantityType == 'press') {
          await Cart.findByIdAndUpdate(
            id,
            { $inc: { quantity: adjust == 'increase' ? 1 : -1 } },
            { new: true },
          );
          return res.status(200).json({
            message: 'cập nhập số lượng press thành công',
            code: 200,
          });
        }
        if (quantityType == 'typing') {
          await Cart.findByIdAndUpdate(id, { quantity: +amount }, { new: true });
          return res.status(200).json({
            message: 'cập nhập số lượng typing thành công',
            code: 200,
          });
        }
        await Cart.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({
          message: 'cập nhập giỏ hàng thành công',
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

export default handleUpdateCart;
