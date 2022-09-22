import { genSalt, hash, compare } from 'bcrypt';
import User from 'src/models/User';
import VerifyCode from 'src/models/VerifyCode';
import dbConnect from 'src/utils/dbConnect';

async function resetPasswordHandler(req, res) {
  const { method } = req;
  const { email, password } = req.body;
  const { code } = req.query;
  try {
    await dbConnect();
    switch (method) {
      case 'POST':
        const validCode = await VerifyCode.findOne({ code, email }).exec();
        if (!validCode) {
          return res.status(403).json({
            message: 'Code vừa nhập đã hết hạn hoặc bị sửa đổi',
            code: 403,
          });
        }
        const userExist = await User.findOne({
          email,
        }).lean();

        if (userExist) {
          const isSamePassword = await compare(password, userExist.password);
          if (isSamePassword) {
            return res.status(405).json({
              message: 'Mật khẩu mới của bạn trùng với mật khẩu hiện tại.',
              code: 405,
            });
          }
          const salt = await genSalt(10);
          const hashPassword = await hash(password, salt);
          await User.findByIdAndUpdate(userExist._id, { password: hashPassword });

          return res.status(200).json({
            message: 'OK',
            code: 200,
          });
        }

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
