import mongoose from 'mongoose';
import User from 'src/models/User';
import Feedback from 'src/models/Feedback';
import dbConnect from 'src/utils/dbConnect';
import qs from 'qs';
async function feedbackHandler(req, res) {
  await dbConnect();
  const { method } = req;
  const { page = 0, limit = 5, productId, select } = qs.parse(req.query);
  console.log(select);
  try {
    switch (method) {
      case 'GET':
        const targetId = mongoose.Types.ObjectId(productId);
        const [rating, feedbacks, total] = await Promise.all([
          Feedback.aggregate([
            { $match: { targetId } },
            {
              $group: {
                _id: '$rating',
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
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
                    { percent: { $multiply: [{ $divide: ['$rating.count', '$total'] }, 100] } },
                    '$rating',
                  ],
                },
              },
            },
          ]),
          Feedback.find({ targetId })
            .skip(page * limit)
            .limit(limit)
            .populate({ path: 'user', model: User, select: '-password' })
            .lean(),
          Feedback.find({ targetId }).countDocuments(),
        ]);

        return res.status(200).json({
          message: 'OK',
          code: 200,
          data: {
            rating,
            feedbacks,
            page: +page,
            pageSize: +limit,
            total,
            pageCount: Math.ceil(total / +limit),
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
