import jwt from 'jsonwebtoken';
import dbConnect from 'src/utils/dbConnect';
const ACC_KEY = process.env.ACCESS_TOKEN_KEY;
dbConnect();
async function generateAccessToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      admin: user.admin,
    },
    ACC_KEY,
    {
      expiresIn: '1d',
    },
  );
}

export default generateAccessToken;
