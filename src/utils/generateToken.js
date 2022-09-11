import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from 'src/pages/api/constant';

export function generateAccessToken(user = {}) {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    ACCESS_TOKEN_KEY,
    {
      expiresIn: '10s',
    },
  );
}

export function generateRefreshToken(user = {}) {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    REFRESH_TOKEN_KEY,
    {
      expiresIn: '1y',
    },
  );
}
