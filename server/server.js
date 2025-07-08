// server/server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

import tenantRoutes from './routes/tenantRoutes.js'; // ✅ default import
import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/propertyRoutes.js';
import userRoutes from './routes/userRoutes.js';

import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use('/api', limiter);

// CORS Config
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.PRODUCTION_FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body Parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Static Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Error:', err);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`
  });
});

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;


// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
// import mongoSanitize from 'express-mongo-sanitize';
// import hpp from 'hpp';
// import cookieParser from 'cookie-parser';

// import tenantRoutes from './routes/tenantRoutes.js';


// import authRoutes from './routes/auth.js';
// import propertyRoutes from './routes/propertyRoutes.js';
// import userRoutes from './routes/userRoutes.js';

// // Error handling middleware
//  import errorHandler from './middleware/errorHandler.js';

// dotenv.config();
// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Security Middlewares
// app.use(helmet());
// app.use(mongoSanitize());
// app.use(hpp());
// app.use(cookieParser());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later'
// });
// app.use('/api', limiter);

// // CORS Configuration
// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://localhost:5174',
//   process.env.PRODUCTION_FRONTEND_URL
// ].filter(Boolean);

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// app.use(cors(corsOptions));

// // Preflight OPTIONS handling
// app.options('*', cors(corsOptions));

// // Body parsing middleware
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// // Static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('✅ MongoDB Connected');
//   } catch (err) {
//     console.error('❌ MongoDB Error:', err);
//     process.exit(1);
//   }
// };

// connectDB();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tenants', tenantRoutes);
// app.use('/api/properties', propertyRoutes);
// app.use('/api/users', userRoutes);

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     status: 'healthy',
//     timestamp: new Date().toISOString(),
//     database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//   });
// });

// // 404 Handler
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: `Not Found - ${req.originalUrl}`
//   });
// });

// // Error handling middleware
// app.use(errorHandler);

// // Server setup
// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () => {
//   console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.error(`❌ Error: ${err.message}`);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });

// export default app;