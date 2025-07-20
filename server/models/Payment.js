const mongoose = require('mongoose'); // ✅ Required import

const paymentSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  amount: Number,
  method: String,
  status: String,
  paymentType: {
    type: String,
    enum: ['deposit', 'monthly rent', 'maintenance'],
    required: true,
  },
  month: {
    type: String, // e.g., "July 2025"
  },
  note: String,
  upiReference: String,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
