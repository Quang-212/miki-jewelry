import passport from 'passport';
import dbConnect from 'src/utils/dbConnect';
import 'src/utils/passport';

export default async function (req, res, next) {
  try {
    await dbConnect();
    passport.authenticate('facebook', {
      authType: 'rerequest',
      scope: ['email'],
      session: false,
    })(req, res, next);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}
