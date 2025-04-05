const express = require('express');
const router = express.Router();
const { isAdmin, verifyToken } = require('../middlewares/authMiddleware');

const { getAllUsers, promoteUser, toggleUserStatus } = require('../controllers/adminController');


router.get('/users', verifyToken, isAdmin, getAllUsers);
router.put('/users/:id/promote', verifyToken, promoteUser);
router.put('/users/:id/toggle-status', verifyToken, isAdmin, toggleUserStatus);

module.exports = router;
