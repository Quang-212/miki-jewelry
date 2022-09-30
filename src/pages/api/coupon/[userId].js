import Coupon from 'src/models/Coupon';
import dbConnect from 'src/utils/dbConnect';
import qs from 'qs';
import UserCoupon from 'src/models/UserCoupon';
import mongoose from 'mongoose';

async function getUserCouponHandler(req, res) {
  await dbConnect();
  const { method } = req;

  let {
    limit = 6,
    page = 0,
    status = 'available',
    discountCategory = '',
    userId,
  } = qs.parse(req.query);

  try {
    switch (method) {
      case 'GET':
        const user_id = mongoose.Types.ObjectId('6315b202a9877afbcee11a3c');
        const matchesPipeline = [{ $eq: ['$status', 'active'] }, { $in: ['$_id', '$$coupon_ids'] }];
        if (discountCategory) {
          matchesPipeline.push({ $eq: ['$discountCategory', discountCategory] });
        }
        const coupons = await UserCoupon.aggregate([
          // { $match: { userId: user_id, status },
          { $match: { userId: user_id } },
          {
            $group: {
              _id: '$userId',
              coupons: { $push: '$coupon' },
            },
          },
          {
            $lookup: {
              from: 'coupons',
              let: { coupon_ids: '$coupons' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: matchesPipeline,
                    },
                  },
                },
                { $limit: +limit },
                { $skip: page * +limit },
                { $sort: { createdAt: -1 } },
              ],
              as: 'coupons',
            },
          },
        ]);
        return res.status(200).json({
          message: 'OK',
          code: 200,
          data: coupons[0]?.coupons || [],
        });
      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default getUserCouponHandler;
