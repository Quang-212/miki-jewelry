import jwt from 'jsonwebtoken';
export default function verifyToken(handler) {
  const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
  return (req, res) => {
    // lấy access token qua header
    const getAccessToken = req.headers?.authorization;
    const accessToken = getAccessToken?.split(' ')?.[1];
    if (accessToken) {
      jwt.verify(accessToken, ACCESS_TOKEN_KEY, async (err, payload) => {
        if (err)
          return res.status(403).json({
            message: 'Mã token đã hết hạn',
            code: 403,
          });
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
