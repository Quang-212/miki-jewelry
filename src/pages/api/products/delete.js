import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

const deleteProduct = async (req, res) => {
  await dbConnect();
  try {
    const { method } = req;
    const { id } = req.body;
    const { type = 'one' } = req.query;

    switch (method) {
      case 'POST':
        type === 'many'
          ? await Product.deleteMany({ _id: { $in: id } })
          : await Product.findByIdAndDelete(id);
        return res.status(200).json({
          message: 'Bạn đã xóa thành công sản phẩm',
          code: 200,
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
};

export default deleteProduct;
