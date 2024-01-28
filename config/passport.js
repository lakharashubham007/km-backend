// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const SocialMediaUser = require('../models/SocialMediaUser');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await SocialMediaUser.findOne({ socialMediaId: profile.id });

    if (!user) {
      user = await SocialMediaUser.create({
        socialMediaId: profile.id,
        platform: 'Google',
        displayName: profile.displayName,
        email: profile.emails[0].value,
        profilePicture: profile.photos[0].value,
        city: '',
      });
    }

    return done(null, user);
  } catch (error) {
    console.error('Error processing Google authentication:', error);
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await SocialMediaUser.findById(id);
    done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error, null);
  }
});

module.exports = passport;
