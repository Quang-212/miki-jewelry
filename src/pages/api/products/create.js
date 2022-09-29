import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function createProduct(req, res) {
  const { method } = req;
  try {
    await dbConnect();
    switch (method) {
      case 'POST':
        const newProduct = await Product.create(req.body);
        return res.status(201).json({
          message: 'Bạn đã tạo mới sản phẩm thành công',
          code: 201,
          data: newProduct,
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

export default createProduct;
