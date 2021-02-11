const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const RESPONSE_MSG = require('../config/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: RESPONSE_MSG.validEmail,
    },
  },
  password: {
    type: String,
    minlength: 10,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.index({ email: 1 }, { unique: true });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new UnauthorizedError(RESPONSE_MSG.incorrectLogin));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new UnauthorizedError(RESPONSE_MSG.incorrectLogin));
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
