const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// @route   POST api/auth/google
// @desc    Google login
router.post('/google', authController.googleLogin);

// @route   POST api/auth/send-otp
// @desc    Send OTP (register / forgot password)
router.post('/send-otp', authController.sendOtp);

// @route   POST api/auth/register
// @desc    Register user
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
router.get('/me', auth, authController.getMe);

// @route   POST api/auth/verify-otp
// @desc    Verify OTP
router.post('/verify-otp', authController.verifyOTP);

// @route   POST api/auth/reset-password
// @desc    Reset password (after OTP verified)
router.post('/reset-password', authController.resetPassword);

module.exports = router;
