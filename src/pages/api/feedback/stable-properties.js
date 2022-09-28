import mongoose from 'mongoose';
import qs from 'qs';
import Feedback from 'src/models/Feedback';
import dbConnect from 'src/utils/dbConnect';
async function feedbackHandler(req, res) {
  await dbConnect();
  const { method } = req;
  const { productId } = qs.parse(req.query);

  try {
    switch (method) {
      case 'GET':
        const targetId = mongoose.Types.ObjectId(productId);
        const [ratingMongo, hasCommentCount, hasMediaCount] = await Promise.all([
          Feedback.aggregate([
            { $match: { targetId } },
            {
              $group: {
                _id: '$rating',
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: -1 } },
            {
              $group: {
                _id: null,
                total: { $sum: '$count' },
                rating: {
                  $push: {
                    star: '$_id',
                    count: '$count',
                  },
                },
              },
            },
            { $unwind: { path: '$rating' } },
            {
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: [
                    '$rating',
                    { percent: { $multiply: [{ $divide: ['$rating.count', '$total'] }, 100] } },
                  ],
                },
              },
            },
          ]),
          Feedback.find({ targetId, comment: { $ne: null } }).countDocuments(),
          Feedback.find({ targetId, 'media.type': { $ne: null } }).countDocuments(),
        ]);

        const ratingStructure = [...Array(5)].map((_, index) => ({
          star: 5 - index,
          count: 0,
          percent: 0,
        }));

        return res.status(200).json({
          message: 'OK',
          code: 200,
          data: {
            rating: ratingStructure.map((item, index) => ratingMongo[index] || item),
            properties: { hasCommentCount, hasMediaCount },
          },
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

export default feedbackHandler;
