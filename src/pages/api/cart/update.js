import Cart from 'src/models/Cart';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function handleUpdateCart(req, res) {
  await dbConnect();
  const { method } = req;

  const { quantityType, id, product } = req.query;
  const { amount, newSize } = req.body;

  try {
    switch (method) {
      case 'PATCH':
        const currentProduct = await Product.findById(product).lean();

        const breakUpdate = () => {
          return res.status(400).json({
            message: 'Cập nhập giỏ hàng không thành công',
            code: 400,
          });
        };
        if (quantityType === 'plus' || quantityType === 'subtract') {
          const cartItem = await Cart.findByIdAndUpdate(
            id,
            { $inc: { quantity: quantityType === 'plus' ? 1 : -1 } },
            { new: true },
          ).lean();

          if (!cartItem) {
            return breakUpdate();
          }
          return res.status(200).json({
            message: 'Cập nhập số lượng press thành công',
            code: 200,
            data: { ...cartItem, product: currentProduct },
          });
        }

        if (quantityType == 'typing') {
          const cartItem = await Cart.findByIdAndUpdate(
            id,
            { quantity: +amount },
            { new: true },
          ).lean();
          if (!cartItem) {
            return breakUpdate();
          }
          return res.status(200).json({
            message: 'Cập nhập số lượng typing thành công',
            code: 200,
            data: { ...cartItem, product: currentProduct },
          });
        }

        if (quantityType == 'updateSize') {
          const cartItem = await Cart.findByIdAndUpdate(
            id,
            { size: newSize },
            { new: true },
          ).lean();
          if (!cartItem) {
            return breakUpdate();
          }
          return res.status(200).json({
            message: 'Cập nhập kích thước thành công',
            code: 200,
            data: { ...cartItem, product: currentProduct },
          });
        }

        return breakUpdate();

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
