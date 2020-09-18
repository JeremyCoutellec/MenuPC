const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token fron header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({
      msg: 'Vous devez vous connecter pour effectuer cette action',
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Le jeton de connection n'est plus valide",
    });
  }
};
