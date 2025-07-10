import Owner from '../models/ownerModel.js' // ✅ Make sure this file is named exactly "OwnerModel.js" and exists
import User from '../models/user.js';
// @desc    Create or Update Owner Profile
// @route   POST /api/owner
// @access  Public or Protected (based on middleware)
export const createOrUpdateOwnerProfile = async (req, res) => {
  try {
    const { userId, name, email, phone, address, bio } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    let owner = await Owner.findOne({ userId });

    if (owner) {
      // update
      owner.name = name;
      owner.email = email;
      owner.phone = phone;
      owner.address = address;
      owner.bio = bio;
      if (profileImage) owner.profileImage = profileImage;

      await owner.save();
    } else {
      // create
      owner = new Owner({ userId, name, email, phone, address, bio, profileImage });
      await owner.save();
    }

    // ✅ Mark user's profile as complete
    await User.findByIdAndUpdate(userId, { profileComplete: true });

    res.status(200).json({ message: 'Profile saved', owner });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// @desc    Get Owner Profile
// @route   GET /api/owners/:userId
// @access  Public or Protected
export const getOwnerProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const owner = await Owner.findOne({ userId });

    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    res.status(200).json(owner);
  } catch (err) {
    console.error('Error in getOwnerProfile:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};
