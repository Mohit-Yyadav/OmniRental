// server/routes/ownerRoutes.js
import express from 'express';
import {
  getOwnerProfile,
  updateOwnerProfile,
  createOwnerProfile,
} from '../controllers/ownerController.js';

const router = express.Router();

router.post('/', createOwnerProfile);
router.get('/:id', getOwnerProfile);
router.put('/:id', updateOwnerProfile);

export default router;
