
import User from '../models/user.js';

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

// ✅ Get tenant profile
export const getTenantProfile = async (req, res) => {
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
