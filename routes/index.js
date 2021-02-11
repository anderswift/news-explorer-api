const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const messages = require('../config/messages');
const NotFoundError = require('../errors/NotFoundError');

const accountRoutes = require('./account');
const userRoutes = require('./users');
const articleRoutes = require('./articles');

router.use('/', accountRoutes);

router.use(auth);

router.use('/', userRoutes);
router.use('/', articleRoutes);

router.use('*', (req, res, next) => { next(new NotFoundError(messages.NotFound)); });

module.exports = router;
