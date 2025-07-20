const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true
}));
app.use(express.json());

// ✅ Serve static files (for image/file uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Route Imports
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

// ✅ Mount API Routes
app.use('/api/auth', authRoutes);                 // Signup, login, etc.
app.use('/api/user', userRoutes);                 // Profile, etc.
app.use('/api/properties', propertyRoutes);       // Property CRUD
app.use('/api/booking-requests', bookingRoutes);  // Booking logic
app.use('/api/tenants', tenantRoutes);            // All tenants route (GET /api/tenants)
app.use('/api/payments', paymentRoutes);   
app.use('/api', paymentRoutes);       // Payments: /my, /order, /verify, etc.
app.use('/api/owner', ownerRoutes);               // Owner-specific actions like add-tenant

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
