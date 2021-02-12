const express = require('express');

const { getCurrentUser } = require('../controllers/userController');

const router = express.Router();

router.get('/users/me', getCurrentUser);

module.exports = router;
