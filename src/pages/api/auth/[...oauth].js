import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { genSalt, hash, compare } from 'bcrypt';
import User from 'src/models/User';
import VerifyCode from 'src/models/VerifyCode';
import dbConnect from 'src/utils/dbConnect';
//handle passport common

async function OAuthAuthentication(req, res) {
  const { method } = req;
  const {} = req.body;
  const { oauth } = req.query;
  try {
    await dbConnect();
    console.log(oauth.join('/'));
    switch (method) {
      case 'GET':
        const api_path = oauth.join('/');
        if (api_path === 'google') {
          passport.authenticate('google', {
            authType: 'rerequest',
            scope: ['profile', 'email'],
          });
          return res.status(200).json({
            code: 200,
            message: 'Ask for consent',
          });
        }

        if (api_path === 'google/callback') {
          passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/api/auth/passport/login/failed',
          });
        }

        if (api_path === 'facebook') {
          passport.authenticate('facebook', { authType: 'rerequest', scope: ['email'] });
        }

        if (api_path === 'facebook/callback') {
          passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/api/auth/passport/login/failed',
          });
        }

        if (api_path === 'passport/logout') {
          req.logout();
          res.redirect('/');
        }

        if (api_path === 'passport/login/failed') {
          res.status(401).json({
            code: 401,
            message: '---user failed to authenticate---',
          });
        }

      default:
        return res.status(400).json({
          message: 'Yêu cầu không hợp lệ',
          code: 400,
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
}

export default OAuthAuthentication;
