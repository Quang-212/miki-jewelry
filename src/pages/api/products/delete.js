import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

const deleteProduct = async (req, res) => {
  await dbConnect();

  const { method } = req;
  const { id } = req.body;

  if (method == 'POST') {
    await Product.findOneAndDelete(id);
    return res.status(200).json({
      message: 'Bạn đã xóa thành công sản phẩm',
      code: 200,
    });
  }
};

export default deleteProduct;
