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
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://omnirental.onrender.com',
      'http://localhost:5173'
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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

const paymentRoutes = require('./routes/paymentRoutes');
const ownerRoutes = require('./routes/ownerRoutes');

const tenantRoutes = require('./routes/tenantRoutes');// 🔥 FIXED: Make sure this file exists



// ✅ Mount API Routes
app.use('/api/auth', authRoutes);                 // Signup, login, etc.
app.use('/api/user', userRoutes);                 // Profile, etc.
app.use('/api/properties', propertyRoutes);       // Property CRUD
app.use('/api/booking-requests', bookingRoutes);  // Booking logic
          // All tenants route (GET /api/tenants)
app.use('/api/payments', paymentRoutes);
     // Payments: /my, /order, /verify, etc.
app.use('/api/owner', ownerRoutes);               // Owner-specific actions like add-tenant


app.use('/api/tenants', tenantRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
