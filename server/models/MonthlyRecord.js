const mongoose = require('mongoose');

const monthlyRecordSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  month: { type: String, required: true }, // Format: '2025-07'
  rent: { type: Number, required: true },
  meterUnits: { type: Number, default: 0 },
  pricePerUnit: { type: Number, default: 0 },
  extraCharges: { type: Number, default: 0 },
  totalAmount: { type: Number },
  isPaid: { type: Boolean, default: false },
  paymentDate: { type: Date },
  invoiceId: { type: String }, // Optional
});

monthlyRecordSchema.pre('save', function (next) {
  this.totalAmount = (this.rent || 0) + (this.meterUnits * this.pricePerUnit) + (this.extraCharges || 0);
  next();
});

module.exports = mongoose.model('MonthlyRecord', monthlyRecordSchema);
