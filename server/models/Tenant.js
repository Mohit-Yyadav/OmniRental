const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  roomNo: { type: String, required: true },
  members: { type: Number, required: true },
  rent: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  meterNumber: { type: Number },
  pricePerUnit: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});



module.exports = mongoose.model('Tenant', tenantSchema);
