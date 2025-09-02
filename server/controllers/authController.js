
const User = require('../models/User'); // ✅ Correct relative path

const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const { validationResult } = require('express-validator');


const { OAuth2Client } = require('google-auth-library');


const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Temporary in-memory store for OTPs (or you can use Redis/DB)
let otpStore = {};




const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, role } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({ username, email, password, role });
    await user.save();

    // Generate JWT
   const token = generateToken(user._id); 

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileComplete: user.profileComplete,
        accessToken: token, // Include token in user object
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ✅ Generate token using helper
    const token = generateToken(user._id);

    // ✅ Return token at root, not inside user object
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileComplete: user.profileComplete,
        profilePic: user.profilePic,
        accessToken: token,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// @desc    Get current user
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




// @desc    Google Login
// @route   POST /api/auth/google
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;

    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, email, picture } = ticket.getPayload();

    if (!email_verified) {
      return res.status(400).json({ message: 'Google login failed. Try again.' });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not exists
      user = new User({
        username: name,
        email,
        password: Math.random().toString(36).slice(-8), // Dummy password
        role: 'tenant', // Default role (you can change logic)
        profilePic: picture,
        profileComplete: false,
      });
      await user.save();
    }

    // Generate JWT
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileComplete: user.profileComplete,
        profilePic: user.profilePic,
        accessToken: token,
      },
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Server error in Google login' });
  }
};



// @desc    Send OTP to email
// @route   POST /api/auth/send-otp
exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    user.isEmailVerified = false;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OmniRental OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP send error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};




// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// ✅ Modify verifyOTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: "No OTP request found" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ message: "Server error verifying OTP" });
  }
};



const bcrypt = require("bcryptjs");

// @desc    Reset password after OTP verification
// @route   POST /api/auth/reset-password
// @desc    Reset password after OTP verification
// @route   POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Only allow if OTP was verified
    if (!user.isEmailVerified) {
      return res.status(400).json({ message: "OTP not verified. Please verify OTP first." });
    }

    // ✅ Just assign password (hook will hash it)
    user.password = password;
user.markModified("password");
    // ✅ Reset verification fields
    user.isEmailVerified = false;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful. You can now login." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error resetting password" });
  }
};
