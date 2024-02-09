// app.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/kampungkulus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Include your user model (assuming you have a User model)
const User = require('./models/User');

// Setup Passport.js local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Your routes will go here
const locationRoutes = require('./routes/locations');
const achievementRoutes = require('./routes/achievements');
const authRoutes = require('./routes/auth');

app.use('/locations', locationRoutes);
app.use('/achievements', achievementRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Your JavaScript code to interact with the backend
/**const submitVolunteerHours = async (userId, locationId, hoursVolunteered) => {
    try {
      const response = await fetch('/achievements/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, locationId, hoursVolunteered }),
      });
  
      const data = await response.json();
      console.log(data); // Handle the response accordingly
    } catch (error) {
      console.error('Error submitting volunteer hours:', error);
    }
  };
  
  // Example usage
  submitVolunteerHours('user123', 'location456', 5);**/
  