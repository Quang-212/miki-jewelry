import mongoose from 'mongoose';
import Cart from 'src/models/Cart';
import dbConnect from 'src/utils/dbConnect';

async function handlerAddCart(req, res) {
  await dbConnect();
  const { method } = req;
  const { userId, product, size, quantity } = req.body;
  console.log(product);

  try {
    switch (method) {
      case 'POST':
        const existCart = await Cart.findOne({ userId });
        const productId = mongoose.Types.ObjectId(product);

        if (existCart) {
          if (
            existCart.products.find(
              (item) => item.size == size && item.product.toString() === product,
            )
          ) {
            await Cart.findByIdAndUpdate(
              existCart._id,
              { $inc: { 'products.$[elem].quantity': quantity || 1 } },
              { arrayFilters: [{ 'elem.product': productId, 'elem.size': size }], new: true },
            );
            return res.status(200).json({
              message: 'Cập nhập số lượng thành công',
              code: 200,
            });
          }

          await Cart.findByIdAndUpdate(existCart._id, {
            $push: { products: { product, size, quantity } },
          });

          return res.status(200).json({
            message: 'Thêm vào giỏ hàng thành công',
            code: 200,
          });
        }

        await Cart.create({
          userId,
          products: [{ product, size, quantity }],
        });

        return res.status(200).json({
          message: 'Tạo mới giỏ hàng thành công',
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

export default handlerAddCart;
