import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { genSalt, hash, compare } from 'bcrypt';
import User from 'src/models/User';

// passport.serializeUser((user, done) => {
//   console.log(user);
//   done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const existOAuthUser = await User.findById(id).lean();
//     done(null, existOAuthUser);
//   } catch (err) {
//     done(null, err);
//   }
// });

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_BASE_URL
    : process.env.DEV_BASE_URL;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${BASE_URL}/api/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        const { sub, name, picture, email } = profile._json;
        const existGGUser = await User.findOne({ email, googleId: sub }).lean();
        // if (existGGUser) {
        //   return done(null, existGGUser);
        // }
        // const newGGUser = await User.create({
        //   googleId: sub.toString(),
        //   displayName: name,
        //   profilePhoto: picture,
        //   email,
        //   provider: 'google',
        // });
        console.log(accessToken, refreshToken);
        return done(null, profile);
      } catch (err) {
        return done(null, err);
      }
    },
  ),
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: `${process.env.SECRET_SERVER_DOMAIN}/auth/facebook/callback`,
//       profileFields: ['id', 'displayName', 'photos', 'email'],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const {
//           id,
//           name,
//           picture: {
//             data: { url },
//           },
//           email,
//         } = profile._json;
//         const existFbUser = await User.findOne({ facebookId: id }).exec();
//         if (existFbUser) {
//           return done(null, existFbUser);
//         } else {
//           const newFbUser = new User({
//             facebookId: id.toString(),
//             displayName: name,
//             profilePhoto: url,
//             email,
//             provider: 'facebook',
//           });
//           const savedUser = await newFbUser.save();
//           return done(null, savedUser);
//         }
//       } catch (err) {
//         return done(null, err);
//       }
//     },
//   ),
// );
