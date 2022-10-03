import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from 'src/models/User';
import { formatSearchString } from './formatString';
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
      callbackURL: `${BASE_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { sub, name, given_name, family_name, picture, email } = profile._json;

        const existGGUser = await User.findOne({ email }).lean();
        if (!existGGUser) {
          const newGGUser = await User.create({
            googleId: sub,
            userName: name,
            profilePicture: { url: picture, public_id: null },
            email,
            search: formatSearchString([given_name, family_name, email]),
          });
          const { password, search, ...safeData } = newGGUser;
          return done(null, safeData);
        }
        if (existGGUser && !existGGUser.googleId) {
          const updatedUser = await findByIdAndUpdate(existGGUser._id, { googleId: sub });
          const { password, search, ...safeData } = updatedUser;
          return done(null, safeData);
        }
        const { password, search, ...safeData } = existGGUser;
        done(null, safeData);
      } catch (err) {
        return done(null, err);
      }
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: `${BASE_URL}/api/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const {
          id,
          name,
          picture: {
            data: { url },
          },
          email,
        } = profile._json;

        const existUser = await User.findOne({ email }).lean();

        if (!existUser) {
          const newUser = await User.create({
            facebookId: id,
            userName: name,
            profilePicture: { url, public_id: null },
            email,
            search: formatSearchString([name, email]),
          });
          const { password, search, ...safeData } = newUser;
          return done(null, safeData);
        }
        if (existUser && !existUser.googleId) {
          const updatedUser = await findByIdAndUpdate(existUser._id, { facebookId: sub });
          const { password, search, ...safeData } = updatedUser;
          return done(null, safeData);
        }
        const { password, search, ...safeData } = existUser;
        done(null, safeData);
      } catch (err) {
        return done(null, err);
      }
    },
  ),
);
