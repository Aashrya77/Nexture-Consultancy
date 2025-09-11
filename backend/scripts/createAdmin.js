const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('../models/User');

// Configure dotenv with the correct path
// Try to use the main .env file first, if not available use the temp.env
const envPath = path.resolve(__dirname, '../.env');
const tempEnvPath = path.resolve(__dirname, './temp.env');

const fs = require('fs');
const envFile = fs.existsSync(envPath) ? envPath : tempEnvPath;

require('dotenv').config({ path: envFile });
console.log(`Using environment file: ${envFile}`);


const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists:');
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Name: ${existingAdmin.firstName} ${existingAdmin.lastName}`);
      console.log(`Role: ${existingAdmin.role}`);
      console.log(`Active: ${existingAdmin.isActive}`);
      
      // Ask if you want to reset password
      console.log('\nIf you forgot the password, you can reset it by running:');
      console.log('node scripts/resetAdminPassword.js');
      return;
    }

    // Create new admin user
    const adminData = {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@nexture.com',
      password: 'admin123', // Default password - should be changed after first login
      role: 'admin',
      department: 'admin',
      isActive: true
    };

    const adminUser = new User(adminData);
    await adminUser.save();

    console.log('✅ Admin user created successfully!');
    console.log('Login credentials:');
    console.log(`Email: ${adminData.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log('\n⚠️  IMPORTANT: Please change the password after first login!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the script
createAdminUser();
