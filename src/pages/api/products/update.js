import dbConnect from 'src/utils/dbConnect';
import Product from 'src/models/Product';

async function updateProduct(req, res) {
  await dbConnect();
  const { id } = req.query;
  console.log(id);
  const { method } = req;
  if (method == 'PATCH') {
    await Product.findByIdAndUpdate(id, req.body);

    return res.status(200).json({
      message: 'Cập nhật thành công',
      code: 200,
    });
  }
}

export default updateProduct;
