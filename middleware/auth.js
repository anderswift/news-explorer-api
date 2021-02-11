const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/environment');
const UnauthorizedError = require('../errors/UnauthorizedError');
const messages = require('../config/messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(messages.authRequired));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new UnauthorizedError(messages.authRequired));
    }
    req.user = payload;

    next();
  }
};
