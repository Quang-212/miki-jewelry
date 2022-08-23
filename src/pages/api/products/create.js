import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

async function createProduct(req, res) {
  const { method } = req;
  try {
    await dbConnect();
    switch (method) {
      case 'POST':
        await Product.create(req.body);
        return res.status(201).json({
          message: 'Bạn đã tạo mới sản phẩm thành công',
          code: 201,
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

export default createProduct;
