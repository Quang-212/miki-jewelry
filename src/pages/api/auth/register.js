import { genSalt, hash } from 'bcrypt';
import User from 'src/models/User';
import UserPromotion from 'src/models/UserPromotion';
import dbConnect from 'src/utils/dbConnect';

async function registerUser(req, res) {
  try {
    await dbConnect();
    const { method } = req;
    const { userName, email, password, promotions } = req.body;
    if (method == 'POST') {
      //kiểm tra user trong data
      const userExist = await User.findOne({
        email,
      });
      if (userExist) {
        return res.status(409).json({
          message: 'Email bạn vừa đăng ký đã tồn tại.',
          code: 409,
        });
      }
      //băm mật khẩu user
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);
      // tạo user mới
      const createUser = await User.create({
        userName,
        email,
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
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default registerUser;
