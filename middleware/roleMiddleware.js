module.exports = function checkRole(allowedRoles = []) {
  return (req, res, next) => {
    try {
      const userRoles = req.user.realm_access?.roles || []; // Extract roles from Keycloak token
      const hasRole = allowedRoles.some((role) => userRoles.includes(role));

      if (!hasRole) {
        return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
      }

      next(); // User has required role(s), proceed to the route handler
    } catch (error) {
      console.error('Role-based access control error:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};
