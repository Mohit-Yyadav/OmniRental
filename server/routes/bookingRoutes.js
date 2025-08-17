const express = require('express');
const router = express.Router();
const {
  createBookingRequest,
  getRequestsForOwner,
  getRequestsForTenant,
  updateBookingStatus
} = require('../controllers/bookingRequestController');

const { protect } = require('../middleware/authMiddleware');

// ✅ Tenant sends booking request
router.post('/', protect, createBookingRequest);

// ✅ Tenant fetches their own requests
router.get('/tenant', protect, getRequestsForTenant);

// ✅ Owner fetches requests for their properties
router.get('/owner', protect, getRequestsForOwner);

// ✅ Owner accepts or rejects booking request
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
