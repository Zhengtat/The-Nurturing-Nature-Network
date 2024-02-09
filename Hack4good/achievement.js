const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  HoursVolunteered: { type: Number, default: 0 },
  plantLevelAchievements: {
    level1tree: { type: Number, default: 0 },
    level2tree: { type: Number, default: 1 },
    level3tree: { type: Number, default: 2 },
    level4tree: { type: Number, default: 3 },
    level5tree: { type: Number, default: 4 },
    level6tree: { type: Number, default: 5 },
    // Add more plant types as needed
  },
  // Add other achievement details
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
