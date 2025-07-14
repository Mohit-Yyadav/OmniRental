const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['tenant', 'owner'], default: 'tenant' },
  profileComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  // ✅ Additional profile fields
  name: String,
  phone: String,
  age: Number,
  gender: String,
  address: String,
  emergencyContact: String,
  idProofNumber: String,
  idProofDoc: {
    uid: String,
    name: String,
    url: String,
  },
  familyMembers: String
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ✅ Avoid OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
