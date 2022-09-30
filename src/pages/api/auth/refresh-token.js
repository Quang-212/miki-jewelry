import jwt from 'jsonwebtoken';
import dbConnect from 'src/utils/dbConnect';
import RefreshToken from 'src/models/RefreshToken';
import { generateAccessToken } from 'src/utils/generateToken';
import { REFRESH_TOKEN_KEY } from 'src/pages/api/constant';

async function handlerRefreshToken(req, res) {
  const { method } = req;

  try {
    await dbConnect();
    switch (method) {
      case 'POST':
        const refreshTokenCookie = req.cookies.refreshToken;

        const isRefreshToken = await RefreshToken.findOne({
          refreshToken: refreshTokenCookie,
        });

        if (isRefreshToken) {
          jwt.verify(refreshTokenCookie, REFRESH_TOKEN_KEY, (err, payload) => {
            if (err) {
              return res.status(401).json({
                message: 'Token expired',
                code: 401,
              });
            }
            const newAccessToken = generateAccessToken(payload);
            return res.status(201).json({
              message: 'OK',
              code: 201,
              accessToken: newAccessToken,
            });
          });
        } else {
          return res.status(401).json({
            message: 'Token expired',
            code: 401,
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
export default handlerRefreshToken;
