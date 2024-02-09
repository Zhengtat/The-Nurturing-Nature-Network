// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username });
    await User.register(newUser, password);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, user: req.user });
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: true });
});

module.exports = router;
