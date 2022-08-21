import mongoose from 'mongoose';
import Rating from 'src/models/Rating';
import dbConnect from 'src/utils/dbConnect';

async function handlerRating(req, res) {
  await dbConnect();
  const { product_id } = req.query;
  const getProductId = await Rating.aggregate({ product_id });
  return res.status(200).json({
    message: 'thành công',
    code: 200,
    getProductId,
  });
}

export default handlerRating;
