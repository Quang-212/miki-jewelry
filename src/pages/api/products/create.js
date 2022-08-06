const mongoose = require('mongoose');

import dbConnect from 'src/utils/dbConnect';
import verifyToken from 'src/middlewares/verifyToken';
import withAuthorization from 'src/middlewares/withAuthorization';
import { cloudinary } from 'src/utils/cloudinary';
import Product from 'src/models/Product';

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

  const option = {
    upload_preset: 'miki-shop',
    public_id: _id,
    overwrite: true,
  };
  console.log(option);
  const arr = ['bracelet', 'earring', 'necklace', 'ring'];
  if (method == 'POST') {
    try {
      // const upload = await cloudinary.uploader.upload(image, option);

      const newData = new Product({
        ...req.body,
        _id,
        name: req.body.name + Math.random().toString(),
        category: arr[Math.floor(Math.random() * arr.length)],
        // image: upload.secure_url,
      });

      await newData.save();
      return res.status(201).json({
        message: 'Bạn đã upload thành công !',
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
