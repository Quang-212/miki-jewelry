import dbConnect from 'src/utils/dbConnect';
import User from 'src/models/User';
import { hash, genSalt } from 'bcrypt';

async function register(req, res) {
  try {
    await dbConnect();
    const { method } = req;
    if (method == 'POST') {
      const existUser = await User.findOne({
        email: req.body.email,
      });
      if (existUser) {
        return res.status(409).json({
          message: 'Email exist!',
          code: 409,
        });
      }
      const salt = await genSalt(10);
      const hashPassword = await hash(req.body.password, salt);

      const createUser = new User({
        email: req.body.email,
        password: hashPassword,
      });
      await createUser.save();
      return res.status(201).json({
        message: 'Register Success!',
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
