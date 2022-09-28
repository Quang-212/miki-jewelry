import mongoose from 'mongoose';
import User from 'src/models/User';
import Feedback from 'src/models/Feedback';
import dbConnect from 'src/utils/dbConnect';
import qs from 'qs';
import { isEmpty } from 'lodash';
async function feedbackHandler(req, res) {
  await dbConnect();
  const { method } = req;
  const {
    page = 0,
    limit = 5,
    productId,
    find_type = 'all',
    properties = [],
    rating = [],
    order = null,
  } = qs.parse(req.query);
  console.log(properties, rating, find_type);
  try {
    switch (method) {
      case 'GET':
        const targetId = mongoose.Types.ObjectId(productId);
        const ratingConverted = rating.map((item) => +item);
        const condition = () => {
          const result = [{ rating: { $in: ratingConverted } }];

          if (properties.includes('hasComment')) {
            result.push({ comment: { $ne: null } });
          }

          if (properties.includes('hasMedia')) {
            result.push({ 'media.type': { $ne: null } });
          }

          return result;
        };

        const [feedbacks, total] = await Promise.all([
          Feedback.find({
            targetId,
            ...(find_type !== 'all' && {
              $or: condition(),
            }),
          })
            .skip(page * limit)
            .limit(limit)
            .sort(order === 'newest' ? { createdAt: -1 } : { rating: -1 })
            .populate({ path: 'user', model: User, select: '-password -search' })
            .lean(),
          Feedback.find({ targetId }).countDocuments(),
        ]);

        return res.status(200).json({
          message: 'OK',
          code: 200,
          data: {
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
