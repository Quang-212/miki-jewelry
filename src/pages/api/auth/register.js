import { genSalt, hash } from 'bcrypt';
import User from 'src/models/User';
import UserPromotion from 'src/models/UserPromotion';
import VerifyCode from 'src/models/VerifyCode';
import dbConnect from 'src/utils/dbConnect';

async function registerUser(req, res) {
  await dbConnect();
  const { method } = req;
  const { email, password, promotions } = req.body;
  const { code } = req.query;
  try {
    switch (method) {
      case 'POST':
        const userExist = await User.findOne({
          email,
        });
        if (userExist) {
          return res.status(409).json({
            message: 'Email bạn vừa đăng ký đã tồn tại.',
            code: 409,
          });
        }
        const validCode = await VerifyCode.findOne({ code, email }).exec();
        if (!validCode) {
          return res.status(403).json({
            message: 'Code vừa nhập đã hết hạn hoặc bị sửa đổi',
            code: 403,
          });
        }
        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);
        await User.create({
          ...req.body,
          password: hashPassword,
        });

        //kiểm tra user đã đăng kí nhận khuyến mãi chưa?
        if (promotions) {
          // tìm emal nười dùng trong data
          const emailUser = await UserPromotion.findOne({ email });
          if (!emailUser) {
            //tạo mới email trong data
            await UserPromotion.create({
              email,
            });
          }
        }

        return res.status(201).json({
          message: 'Chúc mừng bạn đã đăng ký thành công',
          code: 201,
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

export default registerUser;
