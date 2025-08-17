const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllTenants,
  addTenant,
  getMonthlyRecords,
  generateInvoice,
  getMyHistory,
  getMyInvoices,
  
} = require('../controllers/tenantController');

const {createOrder,verifyPayment} = require('../controllers/paymentController')
// All tenant listings for owner
router.get('/add-tenant', protect, getAllTenants);

// Add tenant after deposit
router.post('/add-tenant', protect, addTenant);

// Monthly records
router.get('/:tenantId/records', protect, getMonthlyRecords);

// ✅ Generate invoice
router.post('/generate-invoice', protect, generateInvoice);

// Rental history for current tenant
router.get('/my-history', protect, getMyHistory);


router.get('/my-invoices', protect, getMyInvoices);

router.post('/order', protect, createOrder);

router.post('/verify-invoice-payment',protect,verifyPayment );


module.exports = router;
