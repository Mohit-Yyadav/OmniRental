const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ CORS setup to allow both production and local dev frontend
const allowedOrigins = [
  "https://omnirental.onrender.com",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman/server-side tools
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS error: Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/auth")); // add other routes similarly
// app.use("/api/users", require("./routes/users"));
// app.use("/api/properties", require("./routes/properties"));


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
