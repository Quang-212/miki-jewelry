import jwt from 'jsonwebtoken';
const ACC_KEY = process.env.ACCESS_TOKEN_KEY;
export default function verifyToken(handler) {
  return (req, res) => {
    const token = req.headers?.authorization;
    const accesstoken = token?.split(' ')?.[1];

    if (accesstoken) {
      jwt.verify(accesstoken, ACC_KEY, async (err, payload) => {
        if (err)
          return res.status(403).json({
            message: 'Token đã hết hạn',
            code: 403,
          });
        req.user = payload;
        return handler(req, res);
      });
    } else {
      return res.status(403).json({
        message: 'Bạn không được xác thực',
        code: 403,
      });
    }
  };
}
