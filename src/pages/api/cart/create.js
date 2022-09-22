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
        const products =
          Array.isArray(req.body) &&
          (await Promise.all(req.body.map((item) => Product.findById(item.product).lean())));
        console.log(products, req.body);
        const newCartItem = !Array.isArray(req.body)
          ? await Cart.create({
              userId,
              product,
              size,
              quantity,
            })
          : await Cart.insertMany(req.body);

        return res.status(200).json({
          message: 'Thêm vào giỏ hàng thành công',
          code: 200,
          data: Array.isArray(newCartItem)
            ? newCartItem.map((item, index) => ({ ...item._doc, product: products[index] }))
            : { ...newCartItem._doc, product: currentProduct },
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

export default handlerAddCart;
