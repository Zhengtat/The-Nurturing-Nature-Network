// models/Achievement.js
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  hoursVolunteered: Number,
  // Other achievement details
});

module.exports = mongoose.model('Achievement', achievementSchema);
