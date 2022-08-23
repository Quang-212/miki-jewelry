import Rating from 'src/models/Rating';
import dbConnect from 'src/utils/dbConnect';

async function handlerRating(req, res) {
  await dbConnect();
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
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
      default:
        return res.status(404).json({
          message: 'Không tìm thấy yêu cầu hợp lệ',
          code: 404,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default handlerRating;
