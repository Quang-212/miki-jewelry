import Rating from 'src/models/Rating';
import dbConnect from 'src/utils/dbConnect';

async function handlerRating(req, res) {
  await dbConnect();

  const getProductId = await Rating.aggregate([
    {
      $group: { _id: '$product_id', avg: { $avg: '$count' }, count: { $sum: 1 } },
    },
    { $sort: { _id: 1 } },
  ]);
  return res.status(200).json({
    message: 'thành công',
    code: 200,
    getProductId,
  });
}

export default handlerRating;
