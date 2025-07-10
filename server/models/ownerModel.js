import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming login user stored separately
    required: true,
    unique: true
  },
  name: String,
  email: String,
  phone: String,
  address: String,
  bio: String,
  profileImage: String, // Store file path or URL
});

export default mongoose.model('Owner', ownerSchema);
