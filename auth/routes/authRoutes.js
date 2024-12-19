const express = require('express');
const passport = require('../../middleware/passportConfig');
const {getKeycloakLogoutURL} = require('../../middleware/passportConfig');
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

router.get('/logout', (req, res) => {
  const logoutURL = getKeycloakLogoutURL();

  // Destroy session and redirect to Keycloak logout
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect(logoutURL);
  });
});

module.exports = router;
