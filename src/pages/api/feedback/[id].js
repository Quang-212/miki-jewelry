import mongoose from 'mongoose';
import Rating from 'src/models/Rating';
import dbConnect from 'src/utils/dbConnect';

async function handlerRating(req, res) {
  await dbConnect();
  const product_id = mongoose.Types.ObjectId(req.query.product_id);
  const getProductId = await Rating.aggregate([
    {
      $match: { product_id },
      $group: { _id: '$user_id', count: { $sum: 1 } },
    },
  ]);
  return res.status(200).json({
    message: 'thành công',
    code: 200,
    getProductId,
  });
}

export default handlerRating;
