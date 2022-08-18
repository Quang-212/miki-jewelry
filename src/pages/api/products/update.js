import dbConnect from 'src/utils/dbConnect';
import Product from 'src/models/Product';

async function updateProduct(req, res) {
  await dbConnect();
  const { method } = req;
  const { _id } = req.body;
  console.log(_id);

  if (method == 'POST') {
    const data = await Product.findOneAndUpdate(_id);

    return res.status(200).json({
      message: 'Update thành công',
      code: 200,
      data,
    });
  }
}

export default updateProduct;
