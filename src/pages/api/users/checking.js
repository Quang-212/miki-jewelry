import User from 'src/models/User';
import dbConnect from 'src/utils/dbConnect';

async function getUserByEmail(req, res) {
  const { method } = req;
  const { email } = req.query;
  try {
    await dbConnect();
    switch (method) {
      case 'GET':
        const existUser = await User.findOne({ email });
        if (existUser) {
          return res.status(409).json({
            message: 'Email đã được sử dụng.',
            code: 409,
          });
        }
        return res.status(200).json({
          message: 'Redirect to verify page',
          code: 200,
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

export default getUserByEmail;
