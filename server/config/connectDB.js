// connectDB.js  (replace the file you currently have)
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no deprecated options
    console.log('✅ MongoDB connected:', mongoose.connection.host, '/', mongoose.connection.name);
    return mongoose.connection;
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
