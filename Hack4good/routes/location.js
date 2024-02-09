// routes/locations.js
const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// Route to get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
