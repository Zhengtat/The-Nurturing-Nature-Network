const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('./user.js');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    HoursVolunteered: { type: Number, default: 0 },
    zones: [
        {
            zoneID: {type: Number, required: true, min: 1, max: 6 },
            HoursVolunteered: {type: Number, default: 0 },
        },
    ],
});

router.get('/user/:username/achievements', async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username }).select('zones'); // Assuming the user model has 'zones' field
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user.zones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
module.exports = router;
//module.exports = mongoose.model('User', userSchema);