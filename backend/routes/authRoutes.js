const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { register, login, fetchProfile } = authController;
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, fetchProfile);

module.exports = router;
