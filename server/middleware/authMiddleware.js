// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     console.log('❌ No token provided');
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('✅ Token decoded:', decoded);

//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       console.log('❌ User not found from token');
//       return res.status(401).json({ message: 'User not found' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error('❌ Token verification failed:', error.message);
//     res.status(401).json({ message: 'Token failed' });
//   }
// };

// module.exports = { protect };
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded:', decoded);

    // ✅ FIX: use decoded.userId
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      console.log('❌ User not found from token');
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    res.status(401).json({ message: 'Token failed' });
  }
};

module.exports = { protect };
