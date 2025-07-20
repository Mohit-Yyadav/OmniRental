const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  addTenantToProperty,
  getDepositedTenants
} = require('../controllers/ownerController');

// ✅ Add tenant to property
router.post('/add-tenant', protect, addTenantToProperty);

// ✅ Get deposited tenants list
router.get('/deposits', protect, getDepositedTenants);

module.exports = router;
