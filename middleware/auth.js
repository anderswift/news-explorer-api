const jwt = require('jsonwebtoken');

const { JWT_SECRET, RESPONSE_MSG } = require('../config/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(RESPONSE_MSG.authRequired));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new UnauthorizedError(RESPONSE_MSG.authRequired));
    }
    req.user = payload;

    next();
  }
};
