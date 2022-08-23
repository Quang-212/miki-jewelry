import jwt from 'jsonwebtoken';
import dbConnect from 'src/utils/dbConnect';
import { REFRESH_TOKEN_KEY } from 'src/pages/api/constant';
async function generateRefreshToken(user) {
  await dbConnect();
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    REFRESH_TOKEN_KEY,
    {
      expiresIn: '365d',
    },
  );
}

export default generateRefreshToken;
