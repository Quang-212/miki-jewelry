import { genSalt, hash } from 'bcrypt';
import User from 'src/models/User';
import VerifyCode from 'src/models/VerifyCode';
import dbConnect from 'src/utils/dbConnect';

async function resetPasswordHandler(req, res) {
  await dbConnect();
  const { method } = req;
  const { password } = req.body;
  const { email, code } = req.query;
  try {
    switch (method) {
      case 'POST':
        const validCode = await VerifyCode.findOne({ code, email }).exec();
        if (!validCode) {
          return res.status(403).json({
            message: 'Code vừa nhập đã hết hạn hoặc bị sửa đổi',
            code: 403,
          });
        }

        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);
        await User.findOneAndUpdate(
          { email },
          {
            password: hashPassword,
          },
        );

        return res.status(200).json({
          message: 'OK',
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

export default resetPasswordHandler;
