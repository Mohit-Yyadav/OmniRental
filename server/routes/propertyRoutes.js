import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  deleteProperty,
  updateProperty
} from '../controllers/propertyController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProperties)
  .post(protect, authorize('owner'), createProperty);

router.route('/:id')
  .get(getPropertyById)
  .put(protect, authorize('owner'), updateProperty)
  .delete(protect, authorize('owner'), deleteProperty);

export default router;