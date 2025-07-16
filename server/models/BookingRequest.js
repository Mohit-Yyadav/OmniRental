// models/BookingRequest.js

const mongoose = require('mongoose');

const bookingRequestSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  moveInDate: { type: Date, required: true },
  duration: { type: String, required: true },
  occupation: { type: String },
  additionalInfo: { type: String },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BookingRequest', bookingRequestSchema);
