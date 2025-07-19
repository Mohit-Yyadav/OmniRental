const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ Correct path

const {
  createPayment,
  getMyPayments
} = require('../controllers/paymentController');

router.post('/', protect, createPayment);
router.get('/', protect, getMyPayments);

module.exports = router;
