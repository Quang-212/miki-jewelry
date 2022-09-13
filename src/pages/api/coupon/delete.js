import Coupon from 'src/models/Coupon';
import dbConnect from 'src/utils/dbConnect';

async function createCouponHandler(req, res) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'DELETE':
        await Coupon.findByIdAndDelete(id).exec();
        return res.status(200).json({
          message: 'Delete coupon thành công',
          code: 200,
        });

      default:
        return res.status(404).json({
          message: 'Yêu cầu không hợp lệ',
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

export default createCouponHandler;
