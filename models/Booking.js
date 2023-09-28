const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: String,
  roomId: String,
  date: Date,
});

module.exports = mongoose.model('Booking', bookingSchema);
