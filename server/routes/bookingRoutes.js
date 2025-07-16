const express = require('express');
const router = express.Router();
const {
  createBookingRequest,
  getOwnerBookings,
  getTenantBookings,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Tenant sends booking request
router.post('/', protect, createBookingRequest);

// Owner fetches requests for their properties
router.get('/owner', protect, getOwnerBookings);

// Tenant fetches their own requests
router.get('/tenant', protect, getTenantBookings);

// Owner accepts or rejects booking request
router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
