function checkRole(requiredRole) {
    return (req, res, next) => {
      const userRoles = req.user.roles; // Extract roles from request
      if (userRoles && userRoles.includes(requiredRole)) {
        return next();
      }
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    };
  }
  