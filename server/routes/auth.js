const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').isIn(['tenant', 'owner'])
  ],
  authController.register
);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getMe);

module.exports = router;