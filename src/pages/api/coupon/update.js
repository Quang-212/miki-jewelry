import Coupon from 'src/models/Coupon';
import dbConnect from 'src/utils/dbConnect';

async function updateCouponHandler(req, res) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;
  try {
    switch (method) {
      case 'PATCH':
        const patchedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true }).exec();
        if (!patchedCoupon) {
          return res.status(404).json({
            message: 'Coupon không tồn tại',
            code: 404,
          });
        }
        return res.status(200).json({
          message: 'Update coupon thành công',
          code: 200,
          data: patchedCoupon,
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

export default updateCouponHandler;
