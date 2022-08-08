import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

import RefreshToken from 'src/models/RefreshToken';
import User from 'src/models/User';
import generateAccessToken from 'src/pages/api/generateToken/generateAccessToken';
import generateRefreshToken from 'src/pages/api/generateToken/generateRefreshToken';
import dbConnect from 'src/utils/dbConnect';

async function login(req, res) {
  try {
    await dbConnect();
    const { method } = req;
    if (method == 'POST') {
      //find email in db
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(404).json({
          message: 'Email không tồn tại',
          code: 404,
        });
      //compare password
      const validateUser = await bcrypt.compare(req.body.password, user.password);
      if (!validateUser)
        return res.status(401).json({
          message: 'Mật khẩu không đúng',
          code: 401,
        });
      // login success!
      if (user && validateUser) {
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);
        // create refresh token in db
        const newRefreshToken = new RefreshToken({
          userId: user._id,
          refreshToken,
        });
        // save refresh token in db
        await newRefreshToken.save();

        // save cookie
        res.setHeader(
          'Set-Cookie',
          serialize('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'Strict',
            path: '/',
            Secure: false,
          }),
        );
        const { password, ...other } = user._doc;
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

export default login;
