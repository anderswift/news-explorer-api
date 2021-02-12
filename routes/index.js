const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const { RESPONSE_MSG } = require('../config/constants');
const NotFoundError = require('../errors/NotFoundError');

const accountRoutes = require('./account');
const userRoutes = require('./users');
const articleRoutes = require('./articles');

router.use('/', accountRoutes);

router.use(auth);

router.use('/', userRoutes);
router.use('/', articleRoutes);

router.use('*', (req, res, next) => { next(new NotFoundError(RESPONSE_MSG.NotFound)); });

module.exports = router;
