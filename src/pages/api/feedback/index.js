import Feedback from 'src/models/Feedback';
import dbConnect from 'src/utils/dbConnect';

async function handlerRating(req, res) {
  await dbConnect();
  const { method } = req;
  try {
    switch (method) {
      case 'GET':
        const feedbacks = await Feedback.aggregate([
          {
            $group: { _id: '$product_id', avg: { $avg: '$count' }, count: { $sum: 1 } },
          },
          { $sort: { _id: 1 } },
        ]);

        return res.status(200).json({
          message: 'OK',
          code: 200,
          data: feedbacks,
        });

      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
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
