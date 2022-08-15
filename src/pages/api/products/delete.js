import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

const deleteProduct = async (req, res) => {
  await dbConnect();

  const { method } = req;
  const { id } = req.body;
  const { type = 'one' } = req.query;

  if (method == 'POST') {
    type === 'many'
      ? await Product.deleteMany({ _id: { $in: id } })
      : await Product.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Bạn đã xóa thành công sản phẩm',
      code: 200,
    });
  }
};

export default deleteProduct;

//* delete many
