import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { genSalt, hash, compare } from 'bcrypt';
import User from 'src/models/User';
import VerifyCode from 'src/models/VerifyCode';
import dbConnect from 'src/utils/dbConnect';
//handle passport common

export default async function (req, res, next) {
  try {
    await dbConnect();
    const BASE_URL =
      process.env.NODE_ENV === 'production'
        ? process.env.PRODUCTION_BASE_URL
        : process.env.DEV_BASE_URL;
    passport.authenticate('google', (error, user, info) => {
      if (error || !user) {
        return res.redirect(`${BASE_URL}/failed_to_authenticated`);
      }
      res.redirect('/');
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}
