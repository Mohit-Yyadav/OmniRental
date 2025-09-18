// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['tenant', 'owner'], default: 'tenant' },
//   profileComplete: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
//   // ✅ Additional profile fields
  
//   name: String,
//   phone: String,
//   age: Number,
//   gender: String,
//   address: String,
//   emergencyContact: String,
// familyMembers: String,

//   // 🪪 ID Proof
//   idProofNumber: String,
//   idProofDoc: {
//     uid: String,
//     name: String,
//     url: String, // e.g., "/uploads/id_123456.jpg"
//   },

//   // 🖼️ Profile Picture
//   profilePic: {
//     type: String, // e.g., "/uploads/profile_abc.jpg"
//     default: '',
//   },
// });




// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Method to compare passwords
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // ✅ Avoid OverwriteModelError
// module.exports = mongoose.models.User || mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // 🔹 Login Info
    username: {
    type: String,
    required: true,
    unique: true, // ✅ ensures uniqueness at the DB level
  }, // Optional for Google users
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google OAuth
    role: { type: String, enum: ['tenant', 'owner'], default: 'tenant' },
    provider: { type: String, default: 'local' }, // "local" | "google"
    googleId: { type: String, default: null }, // Google unique ID

// 🔹 OTP for email verification
otp: { type: String, default: null },
otpExpiry: { type: Date, default: null },
isEmailVerified: { type: Boolean, default: false },



    // 🔹 Profile Info
    profileComplete: { type: Boolean, default: false },
    name: { type: String },
    phone: { type: String },
    age: { type: Number },
    gender: { type: String },
    address: { type: String },
    emergencyContact: { type: String },
    familyMembers: { type: String },

    // 🔹 ID Proof
    idProofNumber: { type: String },
    idProofDoc: {
      uid: { type: String, default: null },
      name: { type: String, default: null },
      url: { type: String, default: null }, // e.g., "/uploads/id_123456.jpg"
    },

    // 🔹 Profile Picture
    profilePic: { type: String, default: '' },

    // 🔹 Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// 🔑 Hash password before saving (only if exists and modified)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false; // Google OAuth user
  return await bcrypt.compare(candidatePassword, this.password);
};

// ✅ Avoid OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
