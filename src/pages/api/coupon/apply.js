import Coupon from 'src/models/Coupon';
import UserCoupon from 'src/models/UserCoupon';
import dbConnect from 'src/utils/dbConnect';
import { fTimestamp } from 'src/utils/formartTime';

async function applyCouponHandler(req, res) {
  await dbConnect();
  const { method } = req;
  const { id, userId, state = 'checking' } = req.query;

  try {
    switch (method) {
      case 'GET':
        const [currentCoupon, userCoupon] = await Promise.all([
          Coupon.findById(id).lean(),
          UserCoupon.findOne({ userId, coupon: id }).lean(),
        ]);
        const response = (statusCode = 200, message = 'OK') =>
          res.status(statusCode).json({
            message,
            code: statusCode,
          });
        if (!currentCoupon || !userCoupon) {
          return response(404, 'Coupon không hợp lệ');
        }

        if (userCoupon.status !== 'available') {
          return response(404, 'Coupon đã được sử dụng trước đó');
        }

        if (fTimestamp(currentCoupon.startDate) > fTimestamp(new Date())) {
          return response(405, 'Coupon chưa đến hạn sử dụng');
        }

        if (fTimestamp(currentCoupon.endDate) < fTimestamp(new Date())) {
          return response(405, 'Coupon đã hết hạn sử dụng');
        }

        if (currentCoupon.rest < 1 || currentCoupon.status === 'in-active') {
          return response(405, 'Coupon đã hết lượt sử dụng');
        }
        if (state === 'apply') {
          await Promise.all([
            Coupon.findByIdAndUpdate(id, { $inc: { rest: -1 } }),
            UserCoupon.findOneAndUpdate({ userId, coupon: id }, { status: 'used' }),
          ]);
          return response(200, 'Apply OK');
        }

        return response(200, 'Checking OK');
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

export default applyCouponHandler;
