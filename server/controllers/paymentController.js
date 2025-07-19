// controllers/paymentController.js
const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  try {
    const { amount, method } = req.body;

    const payment = new Payment({
      tenantId: req.user._id,
      amount,
      method,
      status: 'completed',
      date: new Date()
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    console.error("❌ Payment creation failed:", err);
    res.status(500).json({ message: "Payment failed" });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ tenantId: req.user._id }).sort({ date: -1 });
    res.json(payments);
  } catch (err) {
    console.error("❌ Failed to fetch payments:", err);
    res.status(500).json({ message: "Fetching failed" });
  }
};
