const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

passport.use(
  'keycloak',
  new OAuth2Strategy(
    {
      authorizationURL: process.env.KEYCLOAK_AUTH_URL,
      tokenURL: process.env.KEYCLOAK_TOKEN_URL,
      clientID: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      callbackURL: process.env.KEYCLOAK_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      try {
        console.log('Access Token:', accessToken);
        const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
        const decodedToken = jwt.verify(accessToken, publicKey, { algorithms: ['RS256'] });

        console.log('Decoded Token:', decodedToken);
        
        const roles = decodedToken?.realm_access?.roles || [];
        console.log('User Roles:', roles);

        return done(null, { profile, accessToken, roles });
      } catch (err) {
        console.error('Error verifying token:', err.message);
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
