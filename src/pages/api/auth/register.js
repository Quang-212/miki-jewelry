import { genSalt, hash } from 'bcrypt';
import User from 'src/models/User';
import dbConnect from 'src/utils/dbConnect';
async function register(req, res) {
  try {
    await dbConnect();
    const { method } = req;
    const { userName, email, password } = req.body;

    if (method == 'POST') {
      const existUser = await User.findOne({
        email,
      });
      if (existUser) {
        return res.status(409).json({
          message: 'Email bạn vừa đăng ký đã tồn tại.',
          code: 409,
        });
      }
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      const createUser = new User({
        userName,
        email,
        password: hashPassword,
      });
      await createUser.save();
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

export default register;
