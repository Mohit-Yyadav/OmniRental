const mongoose = require('mongoose');

const bookingRequestSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  moveInDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('BookingRequest', bookingRequestSchema);
