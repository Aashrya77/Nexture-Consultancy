const readline = require('readline');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

// Import User model
const User = require('../models/User');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}); 

// Function to ask questions
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Function to ask for password (hidden input)
const askPassword = (question) => {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let password = '';
    process.stdin.on('data', (char) => {
      char = char.toString();
      
      if (char === '\n' || char === '\r' || char === '\u0004') {
        // Enter pressed
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\n');
        resolve(password);
      } else if (char === '\u0003') {
        // Ctrl+C pressed
        process.exit();
      } else if (char === '\u007f') {
        // Backspace pressed
        if (password.length > 0) {
          password = password.slice(0, -1);
          process.stdout.write('\b \b');
        }
      } else {
        // Regular character
        password += char;
        process.stdout.write('*');
      }
    });
  });
};

// Main setup function
const setupAdmin = async () => {
  try {
    console.log('🚀 Nexture Consultancy Admin Setup');
    console.log('=====================================\n');

    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!\n');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  An admin user already exists!');
      console.log(`   Username: ${existingAdmin.username}`);
      console.log(`   Email: ${existingAdmin.email}\n`);
      
      const overwrite = await askQuestion('Do you want to create another admin user? (y/N): ');
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('❌ Setup cancelled.');
        process.exit(0);
      }
      console.log('');
    }

    // Collect admin details
    console.log('📝 Please provide admin details:\n');
    
    const username = await askQuestion('Username: ');
    if (!username || username.length < 3) {
      console.log('❌ Username must be at least 3 characters long.');
      process.exit(1);
    }

    const email = await askQuestion('Email: ');
    if (!email || !email.includes('@')) {
      console.log('❌ Please provide a valid email address.');
      process.exit(1);
    }

    const password = await askPassword('Password (min 6 characters): ');
    if (!password || password.length < 6) {
      console.log('❌ Password must be at least 6 characters long.');
      process.exit(1);
    }

    const confirmPassword = await askPassword('Confirm Password: ');
    if (password !== confirmPassword) {
      console.log('❌ Passwords do not match.');
      process.exit(1);
    }

    console.log('\n🔐 Creating admin user...');

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [
        { username: username },
        { email: email.toLowerCase() }
      ]
    });

    if (existingUser) {
      console.log('❌ Username or email already exists.');
      process.exit(1);
    }

    // Create admin user
    const admin = new User({
      username: username,
      email: email.toLowerCase(),
      password: password, // Will be hashed by the pre-save middleware
      role: 'admin',
      isActive: true
    });

    await admin.save();

    console.log('✅ Admin user created successfully!\n');
    console.log('📋 Admin Details:');
    console.log(`   ID: ${admin._id}`);
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Status: ${admin.isActive ? 'Active' : 'Inactive'}`);
    console.log(`   Created: ${admin.createdAt}\n`);

    console.log('🎉 Setup completed! You can now login with these credentials.');
    console.log('💡 Use POST /api/auth/login to authenticate.\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    
    if (error.code === 11000) {
      console.log('💡 This usually means the username or email already exists.');
    }
    
    process.exit(1);
  } finally {
    rl.close();
    mongoose.connection.close();
  }
};

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n❌ Setup cancelled by user.');
  rl.close();
  mongoose.connection.close();
  process.exit(0);
});

// Run setup
setupAdmin();
