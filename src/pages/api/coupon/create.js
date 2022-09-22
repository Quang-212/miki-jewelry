import mongoose from 'mongoose';
import Coupon from 'src/models/Coupon';
import User from 'src/models/User';
import UserCoupon from 'src/models/UserCoupon';
import dbConnect from 'src/utils/dbConnect';

async function createCouponHandler(req, res) {
  await dbConnect();
  const { method } = req;
  const { code, targetUser, startDate } = req.body;

  const convertCompare = (targetUser) => {
    return targetUser.map((condition) => {
      switch (condition.compare) {
        case 'equal':
          return { [condition.key]: condition.value };
        case 'lte':
          return { [condition.key]: { $lte: condition.value } };
        case 'gte':
          return { [condition.key]: { $gte: condition.value } };
        default:
          return {};
      }
    });
  };
  try {
    switch (method) {
      case 'POST':
        const _id = mongoose.Types.ObjectId();
        const existCoupon = await Coupon.findOne({ code }).exec();
        if (existCoupon) {
          return res.status(409).json({
            message: 'Coupon đã tồn tại',
            code: 409,
          });
        }
        const now = new Date().getTime();

        console.log(convertCompare(targetUser));
        const couponUsers = await User.find({ $and: convertCompare(targetUser) }).select('_id');

        const userCouponData = couponUsers.map((user) => ({
          coupon: _id,
          userId: user._id,
          status: startDate > now ? 'future-plan' : 'active',
        }));

        await Promise.all([
          Coupon.create({ _id, ...req.body }),
          UserCoupon.insertMany(userCouponData),
        ]);

        return res.status(201).json({
          message: 'Tạo coupon thành công',
          code: 201,
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

export default createCouponHandler;
