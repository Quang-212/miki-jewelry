import dbConnect from 'src/utils/dbConnect';
import verifyToken from 'src/middlewares/verifyToken';
import RefreshToken from 'src/models/RefreshToken';

async function logout(req, res) {
  await dbConnect();
  res.setHeader('Set-Cookie', 'refreshToken = delete; path=/');
  await RefreshToken.findOneAndDelete({ userId: req.user._id });
  return res.status(200).json({
    message: 'You are logged out',
    code: 200,
  });
}

export default verifyToken(logout);
