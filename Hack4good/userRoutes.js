const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Zone = require('../models/Zone'); // Define your Zone model
const Friend = require('../models/Friend');
const Achievement = require('../models/Achievement');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user information
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('zones.zoneId friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Volunteer in a zone
router.post('/:userId/volunteer/:zoneId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const zoneId = req.params.zoneId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!zone) {
        return res.status(404).json({error: 'Zone not found' });
    }

    // Check if the provided zoneId is within the valid range
    if (zoneId < 1 || zoneId > 10) {
      return res.status(400).json({ error: 'Invalid zoneId' });
    }

    // Check if the user is already volunteering in this zone
    const existingZone = user.zones.find((z) => z.zoneId === zoneId);

    if (existingZone) {
      return res.status(400).json({ error: 'User is already volunteering in this zone' });
    }

    // Add the zone to the user's zones array
    user.zones.push({ zoneId: zoneId });

    // Save the updated user
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Log hours volunteered in a zone
router.post('/:userId/log-hours/:zoneId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const zoneId = req.params.zoneId;
    const HoursVolunteered = req.body.HoursVolunteered;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the provided zoneId is within the valid range
    if (zoneId < 1 || zoneId > 10) {
      return res.status(400).json({ error: 'Invalid zoneId' });
    }

    // Find the user's zone entry for the specified zone
    const userZone = user.zones.find((z) => z.zoneId === zoneId);

    if (!userZone) {
      return res.status(400).json({ error: 'User is not volunteering in this zone' });
    }

    // Update the hours volunteered in the specified zone
    userZone.hoursVolunteered += hoursVolunteered;

    // Update the total hours volunteered by the user
    user.hoursVolunteered += hoursVolunteered;

    // Save the updated user
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//calculate percentage needed to reach next level
function calcNextLevelPercentage(currentLevel, ExperiencePoints) {
    const ExperienceNeeded = getExperienceNeededForLevel(currentLevel + 1);
    if (ExperienceNeeded === 0) {
        return 0; 
    }
    return (ExperiencePoints / ExperienceNeeded) * 100;
}

//calculate experience points needed for next level
function getExperienceNeededForLevel(level) {
    const levels = [0, 200, 200, 400, 400, 1000, 1000];
    return levels[level] || 0;
}

module.exports = router;
