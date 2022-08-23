import jwt from 'jsonwebtoken';
import RefreshToken from 'src/models/RefreshToken';
import dbConnect from 'src/utils/dbConnect';
import generateAccessToken from '../generateToken/generateAccessToken';
import { REFRESH_TOKEN_KEY } from 'src/pages/api/constant';

async function handlerRefreshToken(req, res) {
  await dbConnect();
  const { method } = req;
  try {
    switch (method) {
      case 'POST':
        //lấy refresh token trên cookie
        const refreshTokenCookie = req.cookies.refreshToken;
        // tìm kiếm refresh token đó trong data
        const isRefreshToken = await RefreshToken.findOne({
          refreshToken: refreshTokenCookie,
        });
        if (isRefreshToken) {
          //kiểm tra refresh token và tạo mới access token
          jwt.verify(refreshTokenCookie, REFRESH_TOKEN_KEY, async (err, payload) => {
            if (err)
              return res.status(401).json({
                message: ' Mã token không còn hiệu lực ',
                code: 401,
              });
            const newAccessToken = await generateAccessToken(payload);
            return res.status(201).json({
              message: ' Tạo mới token thành công ',
              code: 201,
              accessToken: newAccessToken,
            });
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
