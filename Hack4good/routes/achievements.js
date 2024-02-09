// routes/achievements.js
const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');

// Route to submit volunteer hours
router.post('/submit', async (req, res) => {
  try {
    const { userId, locationId, hoursVolunteered } = req.body;

    // Update the achievement system in the database
    await Achievement.create({
      userId,
      locationId,
      hoursVolunteered,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
