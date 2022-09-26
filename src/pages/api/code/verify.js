import VerifyCode from 'src/models/VerifyCode';
import dbConnect from 'src/utils/dbConnect';

async function verifyOTPHandler(req, res) {
  const { method } = req;
  const { code, email } = req.query;
  try {
    await dbConnect();
    switch (method) {
      case 'GET':
        const aliveCode = await VerifyCode.findOne({ code, email }).exec();
        if (aliveCode) {
          return res.status(200).json({
            message: 'Mã xác thực chính xác',
            code: 200,
          });
        }
        return res.status(401).json({
          message: 'Mã xác thực không đúng hoặc đã bị sửa đổi',
          code: 401,
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
export default verifyOTPHandler;
