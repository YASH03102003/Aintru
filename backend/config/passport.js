const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { addUser, findUserByEmail, findUserByProvider } = require('../models/user');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.email); // Use email as the unique identifier
});

// Deserialize user from session
passport.deserializeUser((email, done) => {
  const user = findUserByEmail(email);
  done(null, user);
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = findUserByProvider('google', profile.id);
    if (!user) {
      user = addUser({
        email: profile.emails[0].value,
        name: profile.displayName,
        provider: 'google',
        providerId: profile.id,
        isVerified: true,
        avatar: profile.photos[0]?.value
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Try to get email from profile, fallback to a placeholder if not available
    let email = (profile.emails && profile.emails[0] && profile.emails[0].value)
      ? profile.emails[0].value
      : `${profile.username || profile.id}@github.com`;

    let user = findUserByProvider('github', profile.id);

    if (!user) {
      user = addUser({
        email,
        name: profile.displayName || profile.username || 'GitHub User',
        provider: 'github',
        providerId: profile.id,
        isVerified: true,
        avatar: (profile.photos && profile.photos[0] && profile.photos[0].value) || undefined
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport; 