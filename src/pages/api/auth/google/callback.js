import { serialize } from 'cookie';
import passport from 'passport';
import dbConnect from 'src/utils/dbConnect';
import { generateAccessToken, generateRefreshToken } from 'src/utils/generateToken';
import 'src/utils/passport';
import RefreshToken from 'src/models/RefreshToken';

export default async function (req, res, next) {
  try {
    await dbConnect();
    const BASE_URL =
      process.env.NODE_ENV === 'production'
        ? process.env.PRODUCTION_BASE_URL
        : process.env.DEV_BASE_URL;
    passport.authenticate('google', async (error, user) => {
      if (error || !user) {
        return res.redirect(`${BASE_URL}/failed_to_authenticated`);
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      const existedRefreshToken = await RefreshToken.findOne({ userId: user._id }).lean();
      if (existedRefreshToken) {
        await RefreshToken.findByIdAndUpdate(existedRefreshToken._id, {
          $addToSet: { list: refreshToken },
          isExpired: false,
        });
      }
      if (!existedRefreshToken) {
        await RefreshToken.create({
          userId: user._id,
          list: [refreshToken],
        });
      }

      res.setHeader(
        'Set-Cookie',
        serialize('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'Strict',
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 365 * 24 * 60 * 60,
        }),
      );

      return res.redirect(307, `${BASE_URL}?access_token=${accessToken}`);
    })(req, res, next);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}
