const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createPayment,
  getMyPayments,
  createOrder,
  verifyPayment,
  getDepositedTenants,
  getPaymentsForProperty
} = require('../controllers/paymentController');

// 📥 Tenant Side
router.post('/', protect, createPayment);         // UPI/manual payments
router.get('/my', protect, getMyPayments);        // Tenant dashboard
router.post('/order', protect, createOrder);      // Razorpay: Create order
router.post('/verify', protect, verifyPayment);   // Razorpay: Verify order

// 📤 Owner Side
router.get('/owner/deposits', protect, getDepositedTenants); // 👥 Tenants who paid deposit
router.get('/property/:propertyId/payments', protect, getPaymentsForProperty); // 📄 Payment history per property

module.exports = router;
