const db = require('../models/db');

const logger = require('../utils/logger');

const getTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error(`Error getting tasks: ${err.message}`);
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    if (task.length === 0) return res.status(404).json({ message: 'Task not found' });
    res.json(task[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error(`Error getting task by id: ${err.message}`);
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
      [title, description, userId]
    );
    res.status(201).json({ message: 'Task created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error(`Error creating task: ${err.message}`);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const userId = req.user.id;

  try {
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    if (task.length === 0) return res.status(404).json({ message: 'Task not found' });

    await db.query(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [title, description, status, id]
    );
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error(`Error updating task: ${err.message}`);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
    logger.error(`Error deleting task: ${err.message}`);
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
