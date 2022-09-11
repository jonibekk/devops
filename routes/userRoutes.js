const express = require('express');

const userHandler = require('../handlers/userHandler');
const { authMiddleware } = require('../middlewares/authenticate');

const router = express.Router();

router
.get('/users', authMiddleware, userHandler.getAllUsers)
.post('/signin', userHandler.login)
.post('/signup', userHandler.register);

module.exports = router;