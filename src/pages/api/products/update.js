import dbConnect from 'src/utils/dbConnect';
import Product from 'src/models/Product';

async function updateProduct(req, res) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;
  const { data } = req.body;

  try {
    switch (method) {
      case 'PATCH':
        const data = await Product.findByIdAndUpdate(id, req.body);
        return res.status(200).json({
          message: 'Cập nhật thành công',
          code: 200,
          data,
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

export default updateProduct;
