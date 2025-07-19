import User from '../models/User';
import fs from 'fs';
import path from 'path';

// ✅ Update profile
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // 🛡️ Remove password before sending response
    const { password, ...sanitizedUser } = user.toObject();

    res.json({ user: sanitizedUser });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};



// ✅ Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // 🛡️ Remove password before sending response
    const { password, ...sanitizedUser } = user.toObject();

    res.json({ user: sanitizedUser });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
// ✅ New: Update Profile with File Upload (image + ID proof)


// ✅ Update profile with file uploads
export const updateProfileWithFiles = async (req, res) => {
  try {
    const updates = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ✅ Handle profilePic
    if (req.files?.profilePic?.[0]) {
      // Optional: delete old file
      if (user.profilePic) {
        const oldPath = path.join(process.cwd(), user.profilePic);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      updates.profilePic = `/uploads/${req.files.profilePic[0].filename}`;
    }

    // ✅ Handle ID proof
    if (req.files?.idProofDoc?.[0]) {
      if (user.idProofDoc?.url) {
        const oldPath = path.join(process.cwd(), user.idProofDoc.url);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      updates.idProofDoc = {
        uid: `${Date.now()}`,
        name: req.files.idProofDoc[0].originalname,
        url: `/uploads/${req.files.idProofDoc[0].filename}`,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    const { password, ...sanitized } = updatedUser.toObject();

    res.json({ user: sanitized });
  } catch (err) {
    console.error('🛑 Upload error:', err);
    res.status(500).json({ message: 'Profile upload failed' });
  }
};

