const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Ensure you extract the same property used during token creation
    const user = await User.findById(decoded.userId); // <== Correct if you used 'id' while signing

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = { _id: user._id }; // ✅ Set only what you need (or full user if needed)
    next();
  } catch (err) {
    console.error('JWT error:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
