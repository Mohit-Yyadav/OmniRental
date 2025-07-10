// server/models/ownerModel.js
import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  bio: { type: String },
  profileImage: { type: String }, // optional
}, { timestamps: true });

export default mongoose.model('Owner', ownerSchema);
