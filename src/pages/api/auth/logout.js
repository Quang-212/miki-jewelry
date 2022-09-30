import { serialize } from 'cookie';
import verifyToken from 'src/middlewares/verifyToken';
import RefreshToken from 'src/models/RefreshToken';
import dbConnect from 'src/utils/dbConnect';

async function logout(req, res) {
  const { method } = req;

  try {
    await dbConnect();
    switch (method) {
      case 'DELETE':
        const refreshTokenCookie = req.cookies.refreshToken;

        const refreshTokenMongo = await RefreshToken.findOne({
          refreshToken: refreshTokenCookie,
          userId: req.user._id,
        }).lean();

        if (refreshTokenMongo.concurrency <= 1) {
          await RefreshToken.findByIdAndDelete(refreshTokenMongo._id);
        } else {
          await RefreshToken.findByIdAndUpdate(refreshTokenMongo._id, {
            $inc: { concurrency: -1 },
          });
        }

        res.setHeader(
          'Set-Cookie',
          serialize('refreshToken', null, {
            expires: new Date(0),
            path: '/',
          }),
        );

        return res.status(200).json({
          message: 'Logout OK',
          code: 200,
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

export default verifyToken(logout);
