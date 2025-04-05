const db = require('../models/db');
const logger = require('../utils/logger');
const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, name, email, role, is_active FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
    logger.error(`Error getting all users: ${err.message}`);
  }
};

const promoteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await db.query('UPDATE users SET role = "admin" WHERE id = ?', [userId]);
    res.json({ message: 'User promoted to admin' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
    logger.error(`Error promoting user: ${err.message}`);
  }
};

const toggleUserStatus = async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.query('SELECT is_active FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const newStatus = !rows[0].is_active;
    await db.query('UPDATE users SET is_active = ? WHERE id = ?', [newStatus, userId]);

    res.json({ message: `User is now ${newStatus ? 'active' : 'deactivated'}` });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
    logger.error(`Error toggling user status: ${err.message}`);
  }
};

module.exports = { getAllUsers, promoteUser, toggleUserStatus };