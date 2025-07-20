const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addTenantToProperty } = require('../controllers/ownerController');

// ✅ Route to add a tenant to a property
router.post('/add-tenant', protect, addTenantToProperty);

module.exports = router;
