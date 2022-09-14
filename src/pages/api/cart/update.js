import Cart from 'src/models/Cart';
import dbConnect from 'src/utils/dbConnect';

async function handleUpdateCart(req, res) {
  await dbConnect();
  const { method } = req;

  const { quantityType, userId, product } = req.query;
  const { amount, size, newSize } = req.body;
  console.log(req.query);
  console.log(req.body);

  try {
    switch (method) {
      case 'PATCH':
        if (quantityType === 'plus' || quantityType === 'subtract') {
          await Cart.findOneAndUpdate(
            { userId, products: { $elemMatch: { size, product } } },
            { $inc: { 'products.$.quantity': quantityType === 'plus' ? 1 : -1 } },
          );

          return res.status(200).json({
            message: 'Cập nhập số lượng press thành công',
            code: 200,
          });
        }

        if (quantityType == 'typing') {
          await Cart.findOneAndUpdate(
            { userId, products: { $elemMatch: { size, product } } },
            { $set: { 'products.$.quantity': +amount } },
          );

          return res.status(200).json({
            message: 'Cập nhập số lượng typing thành công',
            code: 200,
          });
        }

        if (quantityType == 'updateSize') {
          await Cart.findOneAndUpdate(
            { userId, products: { $elemMatch: { size, product } } },
            { $set: { 'products.$.size': newSize } },
          );

          return res.status(200).json({
            message: 'Cập nhập kích thước thành công',
            code: 200,
          });
        }

        return res.status(400).json({
          message: 'Cập nhập giỏ hàng không thành công',
          code: 400,
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
