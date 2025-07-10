import express from 'express';
import multer from 'multer';
import {
  createOrUpdateOwnerProfile,
  getOwnerProfile
} from '../controllers/ownerController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// POST or PUT owner profile
router.post('/', upload.single('profileImage'), createOrUpdateOwnerProfile);
// router.post("/api/owner", createOwner); 
// GET owner profile by userId
router.get('/:userId', getOwnerProfile);

export default router;
