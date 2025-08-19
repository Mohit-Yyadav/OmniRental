const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ CORS setup to allow both production and local dev frontend
const allowedOrigins = [
  "http://localhost:5173",           // local frontend
  "https://omnirental.onrender.com"  // production frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / server requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS error: Not allowed by CORS"));
  },
  credentials: true,
}));


// ✅ Middleware
app.use(express.json());

// ✅ Routes
// app.use("/api/auth", require("./routes/auth")); // add other routes similarly
// // app.use("/api/users", require("./routes/users"));
// // app.use("/api/properties", require("./routes/properties"));

// app.use("/api/properties", require("./routes/propertyRoutes")); // ✅ Make sure the file name matches

// ✅ Serve uploaded images from /uploads folder
app.use('/uploads', express.static('uploads'));

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/userRoutes"));             // ✅ add this
app.use("/api/properties", require("./routes/propertyRoutes"));    // ✅ already added
app.use("/api/payments", require("./routes/paymentRoutes"));       // ✅ add this
app.use("/api/tenants", require("./routes/tenantRoutes"));         // ✅ add this
app.use("/api/booking-requests", require("./routes/bookingRoutes")); // ✅ add this
app.use("/api/owner", require("./routes/ownerRoutes"));            // ✅ add this if needed




// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});
