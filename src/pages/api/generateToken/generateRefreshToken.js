import jwt from 'jsonwebtoken';
import dbConnect from 'src/utils/dbConnect';
const REF_KEY = process.env.REFRESH_TOKEN_KEY;
dbConnect();
async function generateRefreshToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      admin: user.admin,
    },
    REF_KEY,
    {
      expiresIn: '365d',
    },
  );
}

export default generateRefreshToken;
