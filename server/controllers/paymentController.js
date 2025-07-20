const crypto = require('crypto');
const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
require('dotenv').config();
const Property = require('../models/Property');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 📥 Create UPI or Manual Payment
exports.createPayment = async (req, res) => {
  try {
    const {
      bookingId,
      amount,
      method,
      status,
      upiReference,
      paymentType,
      month,
      note,
      propertyId,
      ownerId, // ✅ Make sure this is destructured
    } = req.body;

    const payment = new Payment({
      tenantId: req.user._id,
      amount,
      method,
      status,
      upiReference,
      paymentType,
      month,
      note,
      propertyId, // ✅ Save it
      ownerId,    // ✅ Save it
      date: new Date(),
    });

    await payment.save();
    // ✅ Auto-add tenant to property and mark it booked
if (paymentType === 'deposit') {
  await Property.findByIdAndUpdate(propertyId, {
    $addToSet: { tenants: req.user._id },
    isBooked: true,
    status: 'Booked'
  });
}
    res.status(201).json({ success: true, payment });
  } catch (err) {
    console.error('❌ createPayment error:', err);
    res.status(500).json({ success: false, message: 'Failed to create payment' });
  }
};

// 📤 Get Tenant's Payment History
exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ tenantId: req.user._id })
      .populate('propertyId', 'title')
      .populate('ownerId', 'name')
      .sort({ date: -1 });

    const formatted = payments.map((p) => ({
      _id: p._id,
      amount: p.amount,
      status: p.status,
      method: p.method,
      paymentType: p.paymentType,
      upiReference: p.upiReference,
      month: p.month,
      note: p.note,
      date: p.date,
      propertyName: p.propertyId?.title || 'N/A',
      ownerName: p.ownerId?.name || 'N/A',
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error('❌ getMyPayments error:', err);
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
};

// 🧾 Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error('❌ createOrder error:', err);
    res.status(500).json({ success: false, message: 'Order creation failed' });
  }
};

// ✅ Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    method,
    ownerId,
    propertyId,
    paymentType,
    month,
    note,
    tenantId, // ✅ From frontend
  } = req.body;

  try {
    // 🔒 Verify Razorpay signature
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Razorpay signature',
      });
    }

    // ✅ Save payment with tenantId
    const payment = new Payment({
      tenantId,
      ownerId,
      propertyId,
      amount,
      method: method || 'razorpay',
      status: 'completed',
      paymentType,
      month,
      note,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      date: new Date(),
    });

    await payment.save();

    // 🏠 Auto-add tenant to property if it's a deposit
    if (paymentType === 'deposit') {
      await Property.findByIdAndUpdate(propertyId, {
        $addToSet: { tenants: tenantId },
        isBooked: true,
      });
    }

    return res.status(201).json({ success: true, payment });
  } catch (error) {
    console.error('❌ Razorpay verification failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
};



// 📋 Get Tenants who paid Deposit to the Owner
exports.getDepositedTenants = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const deposits = await Payment.find({
      ownerId,
      paymentType: 'deposit',
      status: { $in: ['paid', 'completed'] }
    })
    .populate('tenantId', 'name email phone')
    .populate('propertyId', 'name roomNo address');

    const result = deposits.map(p => ({
      _id: p._id,
      tenantName: p.tenantId?.name || 'N/A',
      tenantEmail: p.tenantId?.email || '—',
      tenantPhone: p.tenantId?.phone || '—',
      propertyName: p.propertyId?.name || '—',
      roomNo: p.propertyId?.roomNo || '—',
      address: p.propertyId?.address || '',
      amount: p.amount,
      date: p.date,
      note: p.note,
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ getDepositedTenants error:", err);
    res.status(500).json({ message: "Failed to fetch deposited tenants" });
  }
};

// 🏘 Get All Payments for a Property (Owner view)
exports.getPaymentsForProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const payments = await Payment.find({ propertyId })
      .populate('tenantId', 'name email')
      .sort({ date: -1 });

    const data = payments.map(p => ({
      _id: p._id,
      tenantName: p.tenantId?.name || 'N/A',
      email: p.tenantId?.email,
      amount: p.amount,
      method: p.method,
      status: p.status,
      paymentType: p.paymentType,
      month: p.month,
      note: p.note,
      date: p.date,
    }));

    res.status(200).json(data);
  } catch (err) {
    console.error("❌ getPaymentsForProperty error:", err);
    res.status(500).json({ message: "Failed to fetch property payments" });
  }
};


