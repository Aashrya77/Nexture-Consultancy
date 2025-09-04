const express = require('express');
const router = express.Router();

// Import controllers and middleware
const {
  login,
  refreshToken,
  logout,
  getProfile,
  updateProfile,
  changePassword
} = require('../Controllers/Auth');

const { authenticate } = require('../middleware/auth');
const {
  validateLogin,
  validateProfileUpdate,
  validatePasswordChange,
  validateRefreshToken
} = require('../middleware/validation');

// Admin login route
router.post('/login', validateLogin, login);
router.post('/refresh-token', validateRefreshToken, refreshToken);

// Protected admin routes
router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validateProfileUpdate, updateProfile);
router.put('/change-password', authenticate, validatePasswordChange, changePassword);

module.exports = router;
