import { compare } from 'bcrypt';
import { serialize } from 'cookie';
import RefreshToken from 'src/models/RefreshToken';
import User from 'src/models/User';
import { generateRefreshToken, generateAccessToken } from 'src/utils/generateToken';
import dbConnect from 'src/utils/dbConnect';

async function loginUser(req, res) {
  await dbConnect();
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        const emailUser = await User.findOne({ email: req.body.email }).lean();
        if (!emailUser)
          return res.status(404).json({
            message: 'Email không tồn tại',
            code: 404,
          });

        const validateUser = await compare(req.body.password, emailUser.password);

        if (!validateUser)
          return res.status(401).json({
            message: 'Mật khẩu không đúng',
            code: 401,
          });

        if (emailUser && validateUser) {
          const accessToken = generateAccessToken(emailUser);
          const refreshToken = generateRefreshToken(emailUser);

          await RefreshToken.create({
            userId: emailUser._id,
            refreshToken,
          });
          res.setHeader(
            'Set-Cookie',
            serialize('refreshToken', refreshToken, {
              httpOnly: true,
              sameSite: 'Strict',
              path: '/',
              secure: false,
              maxAge: 365 * 24 * 60 * 60,
            }),
          );
          const { password, ...other } = emailUser;
          return res.status(200).json({
            message: 'Chào mừng bạn đến với Miki Jewelry',
            code: 200,
            accessToken,
            user: other,
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

export default loginUser;
