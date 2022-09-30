import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_KEY } from 'src/pages/api/constant';

export default function verifyToken(handler) {
  return (req, res) => {
    const getAccessToken = req.headers?.authorization;
    const accessToken = getAccessToken?.split(' ')?.[1];
    if (accessToken) {
      jwt.verify(accessToken, ACCESS_TOKEN_KEY, (err, payload) => {
        if (err) {
          console.log(err);
          return res.status(403).json({
            message: 'Mã token đã hết hạn',
            code: 403,
          });
        }
        req.user = payload;
        return handler(req, res);
      });
    } else {
      return res.status(403).json({
        message: 'Vui lòng đăng nhập ',
        code: 403,
      });
    }
  };
}
