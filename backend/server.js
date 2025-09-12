const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./DB/connect');
const app = express();
const path = require('path');

// Import routes
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const teamRoutes = require('./routes/team');
const uploadRoutes = require('./routes/HomeContent');
const blogRoutes = require('./routes/Blogs');
const consultationRoutes = require('./routes/consultation');

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'],
    credentials: true,  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    optionsSuccessStatus: 200
}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, filePath) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));



// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Nexture Education API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/team', teamRoutes);

app.use('/api/home', uploadRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/consultation', consultationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
   
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
});
  } catch (error) {
    console.error('❌ Server initialization error:', error);
    process.exit(1);
  }
};

start();
