import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
} from '../controllers/propertyController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProperties)
  .post(protect, authorize('owner'), createProperty);

router.route('/:id')
  .get(getProperty)
  .put(protect, authorize('owner'), updateProperty)
  .delete(protect, authorize('owner'), deleteProperty);

export default router;