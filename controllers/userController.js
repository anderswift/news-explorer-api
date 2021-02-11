const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET = 'secret_salt' } = process.env;
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(200).send({ token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }) });
    })
    .catch(next);
}

function getUserById(req, res, next) {
  return User.findById({ _id: req.params.id })
    .then((user) => {
      if (user === null) throw new NotFoundError('User ID not found');
      else res.status(200).send(user);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    email,
    password,
    name,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send({ _id: user._id, email: user.email, name: user.name });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  return User.findById({ _id: req.user._id })
    .then((user) => {
      if (user === null) throw new NotFoundError('User not found');
      else {
        res.status(200).send({
          email: user.email,
          name: user.name,
        });
      }
    })
    .catch(next);
}

module.exports = {
  login,
  getUserById,
  createUser,
  getCurrentUser,
};
