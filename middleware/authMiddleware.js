const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return an unauthorized error
  if (!token) {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Use the same secret as in your login route
    req.user = decoded; // Attach the user information to the request object
    next(); // Call the next middleware or route handler
  } catch (err) {
    // If token verification fails, return an unauthorized error
    return res.status(401).json({ error: 'Token is not valid' });
  }
};