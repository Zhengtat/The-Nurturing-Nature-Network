// models/Location.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  // Other location details
});

module.exports = mongoose.model('Location', locationSchema);
