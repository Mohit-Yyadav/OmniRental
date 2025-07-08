// server/routes/userRoutes.js

import express from 'express';
const router = express.Router();

// Dummy user route
router.get('/', (req, res) => {
  res.send('✅ User route working!');
});

export default router;