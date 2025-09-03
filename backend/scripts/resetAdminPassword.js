const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const resetAdminPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('❌ No admin user found. Please run createAdmin.js first.');
      return;
    }

    // Set new password
    const newPassword = 'admin123'; // Default password
    adminUser.password = newPassword;
    adminUser.isActive = true; // Ensure admin is active
    
    await adminUser.save();

    console.log('✅ Admin password reset successfully!');
    console.log('Login credentials:');
    console.log(`Email: ${adminUser.email}`);
    console.log(`Password: ${newPassword}`);
    console.log('\n⚠️  IMPORTANT: Please change the password after login!');

  } catch (error) {
    console.error('❌ Error resetting admin password:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the script
resetAdminPassword();
