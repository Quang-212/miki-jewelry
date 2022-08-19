const mongoose = require('mongoose');

import Product from 'src/models/Product';
import dbConnect from 'src/utils/dbConnect';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
const createProduct = async (req, res) => {
  await dbConnect();
  const _id = new mongoose.Types.ObjectId();
  const { method } = req;

  // const option = {
  //   upload_preset: 'miki-shop',
  //   public_id: _id,
  //   overwrite: true,
  // };

  if (method == 'POST') {
    try {
      await Product.create(req.body);
      return res.status(201).json({
        message: 'Bạn đã tạo mới sản phẩm thành công!',
        code: 201,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Lỗi server',
        code: 500,
      });
    }
  }
};

export default createProduct;
