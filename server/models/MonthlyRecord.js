const mongoose = require('mongoose');

const monthlyRecordSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  month: { type: String, required: true }, // e.g. "2025-07"
  
  rent: { type: Number, required: true },
  
  previousReading: { type: Number, required: true }, // 👈 NEW
  newMeterReading: { type: Number, required: true }, // 👈 NEW
  pricePerUnit: { type: Number, required: true },

  meterUnits: { type: Number, default: 0 }, // calculated
  electricityCharge: { type: Number, default: 0 }, // optional if you want
  
  extraCharges: { type: Number, default: 0 },
  totalAmount: { type: Number },

  isPaid: { type: Boolean, default: false },
  paymentDate: { type: Date },
  invoiceId: { type: String },
});

// ✅ Auto-calculate units, electricityCharge, and totalAmount
monthlyRecordSchema.pre('save', function (next) {
  this.meterUnits = this.newMeterReading - this.previousReading;
  this.electricityCharge = this.meterUnits * this.pricePerUnit;
  this.totalAmount =
    (this.rent || 0) + this.electricityCharge + (this.extraCharges || 0);
  next();
});

module.exports = mongoose.model('MonthlyRecord', monthlyRecordSchema);
