const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
   roomNo: {
    type: String,
    required: true,
  },
  name: String,
  address: String,
  rent: Number,
  type: String,
  furnished: String,
  sharing: String,
  description: String,
  amenities: [String],
  images: [String], // URLs of uploaded images
  location: String,
  status: {
    type: String,
    default: 'Vacant',
  },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
