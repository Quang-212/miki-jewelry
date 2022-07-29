import User from 'src/models/User';
import RefreshToken from 'src/models/RefreshToken';
import dbConnect from 'src/utils/dbConnect';
import bcrypt from 'bcrypt';
import generateAccessToken from '../generateToken/generateAccessToken';
import generateRefreshToken from '../generateToken/generateRefreshToken';
import { serialize } from 'cookie';

async function login(req, res) {
  try {
    await dbConnect();
    if (req.method == 'POST') {
      //check mail in DB
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).json({
          message: 'Email is not exist!',
        });
      // compare password user
      const validateUser = await bcrypt.compare(req.body.password, user.password);
      if (!validateUser)
        return res.status(401).json({
          message: 'Wrong password!',
          code: 401,
        });
      // user login success
      if (user && validateUser) {
        //create new access token and refresh token
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);
        //create new refreshToken
        const newFreshToken = new RefreshToken({
          userId: user._id,
          refreshToken,
        });
        // save new refreshToken in DB
        await newFreshToken.save();
        // save new refreshToken  cookie
        res.setHeader(
          'Set-Cookie',
          serialize('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'Strict',
            path: '/',
            secure: false,
          }),
        );
        return res.status(200).json({ user, accessToken });
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
