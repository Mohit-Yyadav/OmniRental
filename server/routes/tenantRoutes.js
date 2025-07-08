import express from 'express';
import { applyForRental } from '../controllers/tenantController.js';

const router = express.Router();

router.post('/apply', applyForRental);

export default router;