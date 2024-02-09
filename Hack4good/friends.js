const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    friendLevel: {type: Number, default: 1 },
    friendExperienceLevel: {type: Number, default: 0 },
    friendExperiencePoints: {type: Number, default: 0},
    friendAchievements: [
        {
            locationId: {type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
            HoursVolunteered: {type: Number, default: 0 },
        },
    ],
});

module.exports = mongoose.model('Friend', friendSchema);