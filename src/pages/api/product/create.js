import mongoose from 'mongoose';

import dbConnect from 'src/utils/dbConnect';
import verifyToken from 'src/middlewares/verifyToken';
import withAuthorization from 'src/middlewares/withAuthorization';
import { cloudinary } from 'src/utils/cloudinary';
import Product from 'src/models/Product';
import { data } from 'autoprefixer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
async function createProduct(req, res) {
  await dbConnect();
  const _id = new mongoose.Types.ObjectId();
  const { method } = req;
  if (method == 'POST') {
    try {
      const { name, priceNew, coupon, size, category, image, description, sku, stockQuantity } =
        req.body;
      const option = {
        upload_preset: 'miki-shop',
        public_id: _id,
        overwrite: true,
      };

      const upload = await cloudinary.uploader.upload(image, option);
      const datat = new Product({
        _id,
        name,
        priceNew,
        coupon,
        size,
        category,
        iamge: upload.secure_url,
        description,
        sku,
        stockQuantity,
      });

      await data.save();
      return res.status(201).json({
        message: 'Bạn đã upload thành công !',
        code: 201,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        code: 500,
      });
    }
  }
}

export default createProduct;
