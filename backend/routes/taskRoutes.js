const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

const { createTask, getTasks, getTaskById, updateTask, deleteTask } = taskController;

router.post('/', verifyToken,  createTask);
router.get('/',verifyToken,  getTasks);
router.get('/:id', verifyToken, getTaskById);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;
