// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const TenantSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please add a name']
//   },
//   email: {
//     type: String,
//     required: [true, 'Please add an email'],
//     unique: true,
//     match: [
//       /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//       'Please add a valid email'
//     ]
//   },
//   password: {
//     type: String,
//     required: [true, 'Please add a password'],
//     minlength: 6,
//     select: false
//   },
//   phone: {
//     type: String,
//     required: [true, 'Please add a phone number']
//   },
//   photo: {
//     type: String,
//     default: 'default-tenant.jpg'
//   },
//   documents: [{
//     type: String // Array of document URLs
//   }],
//   location: {
//     type: {
//       type: String,
//       enum: ['Point'],
//       default: 'Point'
//     },
//     coordinates: {
//       type: [Number],
//       required: true,
//       index: '2dsphere'
//     },
//     formattedAddress: String,
//     street: String,
//     city: String,
//     state: String,
//     zipcode: String,
//     country: String
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Encrypt password using bcrypt
// TenantSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// module.exports = mongoose.model('Tenant', TenantSchema);

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  location: String,
  photo: String,
  documents: [String]
}, {
  timestamps: true
});

// Password match method
tenantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before save
tenantSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ DEFAULT EXPORT: ये ज़रूरी है तुम्हारी import के लिए
const Tenant = mongoose.model('Tenant', tenantSchema);
export default Tenant;
