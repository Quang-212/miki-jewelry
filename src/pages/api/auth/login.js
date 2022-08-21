import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import RefreshToken from 'src/models/RefreshToken';
import User from 'src/models/User';
import generateAccessToken from 'src/pages/api/generateToken/generateAccessToken';
import generateRefreshToken from 'src/pages/api/generateToken/generateRefreshToken';
import dbConnect from 'src/utils/dbConnect';

async function loginUser(req, res) {
  try {
    await dbConnect();
    const { method } = req;
    if (method == 'POST') {
      //tìm kiếm email user có tồn tại trong data
      const emailUser = await User.findOne({ email: req.body.email });
      if (!emailUser)
        return res.status(404).json({
          message: 'Email không tồn tại',
          code: 404,
        });
      //so sánh mật khẩu user nhập
      const validateUser = await bcrypt.compare(req.body.password, emailUser.password);
      if (!validateUser)
        return res.status(401).json({
          message: 'Mật khẩu không đúng',
          code: 401,
        });
      // user đăng nhập thành công
      if (emailUser && validateUser) {
        const accessToken = await generateAccessToken(emailUser);
        const refreshToken = await generateRefreshToken(emailUser);
        //tạo refresh token mới trong data
        await RefreshToken.create({
          _id: emailUser._id,
          refreshToken,
        });

        // lưu refresh trên cookie
        res.setHeader(
          'Set-Cookie',
          serialize('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'Strict',
            path: '/',
            Secure: false,
          }),
        );
        const { password, ...other } = emailUser._doc;
        return res.status(200).json({
          message: 'Chào mừng bạn đến với Miki Jewelry',
          code: 200,
          accessToken,
          ...other,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default loginUser;
