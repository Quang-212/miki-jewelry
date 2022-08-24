import dbConnect from 'src/utils/dbConnect';
import Product from 'src/models/Product';
import verifyToken from 'src/middlewares/verifyToken';
import withAuthorization from 'src/middlewares/withAuthorization';

const deleteProduct = async (req, res) => {
  await dbConnect();
  const { method } = req;
  const { slug } = req.query;
  try {
    switch (method) {
      case 'GET':
        const product = await Product.findOne({ slug });
        return res.status(200).json({
          message: 'Tìm kiếm thành công sản phẩm',
          code: 200,
          product,
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
};

export default verifyToken(withAuthorization(deleteProduct));
