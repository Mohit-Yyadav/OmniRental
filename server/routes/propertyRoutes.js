const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // ✅ Import multer middleware
const {
  addProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPublicProperties,
  getPublicPropertyById,
} = require('../controllers/propertyController');

const { protect } = require('../middleware/authMiddleware');

// ✅ Public routes
router.get('/public', getPublicProperties);
router.get('/public/:id', getPublicPropertyById);

// ✅ Private routes (with auth and upload middleware)
router.post('/', protect, upload.array('images'), addProperty);        // ✅ ADD upload middleware
router.get('/', protect, getProperties);
router.get('/:id', protect, getPropertyById);
router.put('/:id', protect, upload.array('images'), updateProperty);  // ✅ ADD upload middleware
router.delete('/:id', protect, deleteProperty);

module.exports = router;
