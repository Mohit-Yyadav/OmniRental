// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import Tenant from '../models/Tenant.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const router = express.Router();

// // ✅ Ensure uploads folder exists
// const uploadPath = path.join(__dirname, '../../uploads');
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// // ✅ Multer Setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `tenant-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({ storage });

// // ✅ POST /api/tenants - Create New Tenant
// router.post('/', upload.array('images', 6), async (req, res) => {
//   try {
//     // 🧾 Log for debugging
//     console.log("📥 req.body:", req.body);
//     console.log("📸 req.files:", req.files);

//     // ✅ Check for images
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: 'No images uploaded' });
//     }

//     const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
//     const tenantData = { ...req.body, imageUrls };

//     const tenant = new Tenant(tenantData);
//     await tenant.save();

//     res.status(201).json(tenant);
//   } catch (err) {
//     console.error('❌ Server Error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ GET /api/tenants - Get All Tenants
// router.get('/', async (req, res) => {
//   try {
//     const tenants = await Tenant.find().sort({ createdAt: -1 });
//     res.json(tenants);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ PUT /api/tenants/:id - Update Tenant
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Tenant.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ DELETE /api/tenants/:id - Delete Tenant
// router.delete('/:id', async (req, res) => {
//   try {
//     await Tenant.findByIdAndDelete(req.params.id);
//     res.json({ message: "Tenant deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
const express = require('express');
const router = express.Router();
const {
  registerTenant,
  loginTenant,
  getMe,
  updateTenant,
  getRentalHistory,
  applyForRental
} = require('../controllers/tenantController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerTenant);
router.post('/login', loginTenant);
router.get('/me', protect, getMe);
router.put('/update', protect, updateTenant);
router.get('/history', protect, getRentalHistory);
router.post('/apply/:tenderId', protect, applyForRental);

module.exports = router;