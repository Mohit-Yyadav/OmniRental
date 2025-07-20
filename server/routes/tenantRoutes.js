const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllTenants } = require('../controllers/tenantController');

// ✅ GET /api/tenants
router.get('/', protect, getAllTenants);

module.exports = router;
