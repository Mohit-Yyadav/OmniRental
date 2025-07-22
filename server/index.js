// index.js or app.js (backend entry file)
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS setup to allow both production and local dev frontend
const allowedOrigins = [
  "https://omnirental.onrender.com",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server or tools like Postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS error: Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Your other middleware
app.use(express.json());

// Your routes
app.use("/api/auth", require("./routes/auth")); // example

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
