import mongoose from 'mongoose';
import Cart from 'src/models/Cart';
import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function handlerAddCart(req, res) {
  await dbConnect();
  const { method } = req;
  const { userId, product, size, quantity = 1 } = req.body;

  try {
    switch (method) {
      case 'POST':
        const [existCart, currentProduct] = await Promise.all([
          Cart.findOne({ userId, product, size, status: { $nin: ['ordered', 'deleted'] } }),
          Product.findById(product).lean(),
        ]);

        if (existCart) {
          const updatedCartItem = await Cart.findByIdAndUpdate(
            existCart._id,
            { $inc: { quantity } },
            { new: true },
          ).lean();

          return res.status(200).json({
            message: 'Cập nhập số lượng thành công',
            code: 200,
            data: { ...updatedCartItem, product: currentProduct },
          });
        }

        const newCartItem = await Cart.create({
          userId,
          product,
          size,
          quantity,
        });

        return res.status(200).json({
          message: 'Thêm vào giỏ hàng thành công',
          code: 200,
          data: { ...newCartItem._doc, product: currentProduct },
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

export default handlerAddCart;
