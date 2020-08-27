const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get Token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    // if it doesnt verify then we throw error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
