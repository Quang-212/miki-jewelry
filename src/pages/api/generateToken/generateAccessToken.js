import jwt from 'jsonwebtoken';
import dbConnect from 'src/utils/dbConnect';
import { ACCESS_TOKEN_KEY } from 'src/pages/api/constant';
async function generateAccessToken(user) {
  await dbConnect();
  return jwt.sign(
    {
      _id: user._id,
      admin: user.admin,
    },
    ACCESS_TOKEN_KEY,
    {
      expiresIn: '1d',
    },
  );
}

export default generateAccessToken;
