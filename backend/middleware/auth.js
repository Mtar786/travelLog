const jwt = require('jsonwebtoken');

/**
 * Authentication middleware to verify JSON Web Tokens.
 *
 * Tokens are expected to be sent in the `x-auth-token` header. If a
 * valid token is provided, `req.user` will be populated with the
 * decoded payload (containing the user ID). Otherwise, a 401 error is
 * returned.
 */
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};