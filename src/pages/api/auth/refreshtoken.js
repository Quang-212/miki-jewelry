import generateAccessToken from '../generateToken/generateAccessToken';
import RefreshToken from 'src/models/RefreshToken';
import dbConnect from 'src/utils/dbConnect';
import jwt from 'jsonwebtoken';

import verifyToken from 'src/middlewares/verifyToken';
const REF_KEY = process.env.REFRESH_TOKEN_KEY;

async function handlerRefreshToken(req, res) {
  await dbConnect();

  const { method } = req;
  if (method == 'POST') {
    const refreshToken = req.cookies.refreshToken;
    const isRefreshToken = await RefreshToken.findOne({
      refreshToken,
    });
    if (isRefreshToken) {
      jwt.verify(refreshToken, REF_KEY, async (err, payload) => {
        if (err)
          return res.status(401).json({
            message: 'Token không còn hiệu lực!',
            code: 401,
          });
        const newAccessToken = await generateAccessToken(payload);
        return res.status(201).json({
          message: 'Reset token thành công!',
          code: 201,
          accessToken: newAccessToken,
        });
      });
    }
  }
}

export default handlerRefreshToken;
