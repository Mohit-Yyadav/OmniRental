const express = require('express');
const { updateProfile, getTenantProfile, updateProfileWithFiles } = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload'); // ✅ Multer middleware

const router = express.Router();

// Existing routes
router.get('/me', auth, getTenantProfile);
router.put('/me', auth, updateProfile);

// ✅ New route for file upload
router.put(
  '/me/upload',
  auth,
  upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'idProofDoc', maxCount: 1 },
  ]),
  updateProfileWithFiles
);

module.exports = router;
