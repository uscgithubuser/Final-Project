const express = require('express');
const passport = require('../../middleware/passportConfig');

const router = express.Router();

// Redirect to Keycloak for login
router.get(
  '/login',
  passport.authenticate('keycloak', { scope: ['openid'] }) // OpenID Connect scope
);

// Keycloak callback route
router.get(
  '/callback',
  passport.authenticate('keycloak', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    res.json({
      message: 'Successfully authenticated with Keycloak',
      user: req.user,
    });
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }

    // Keycloak logout URL with redirect URI
    const keycloakLogoutURL = `http://localhost:8080/realms/final-project/protocol/openid-connect/logout?redirect_uri=http://localhost:4000/`;

    // Destroy the session and redirect to Keycloak logout
    req.session.destroy((sessionErr) => {
      if (sessionErr) {
        console.error('Session destruction error:', sessionErr);
      }
      res.redirect(keycloakLogoutURL);
    });
  });
});

module.exports = router;
