// server/routes/userRoutes.js
const express = require('express');
const { updateProfile, getTenantProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, getTenantProfile);
router.put('/me', auth, updateProfile);

module.exports = router;
