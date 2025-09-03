const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Blog = require('../models/Blog');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nexture-education', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create admin user
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@nexture-education.com' });
    
    if (!adminExists) {
      const admin = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@nexture-education.com',
        password: 'admin123',
        role: 'admin',
        department: 'admin',
        isActive: true,
        emailVerified: true
      });
      
      await admin.save();
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: admin@nexture-education.com');
      console.log('🔑 Password: admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
};

// Create sample counselor users
const createSampleUsers = async () => {
  try {
    const sampleUsers = [
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@nexture-education.com',
        password: 'counselor123',
        role: 'counselor',
        department: 'counseling',
        specializations: ['usa', 'canada', 'ielts', 'toefl'],
        phone: '+1-555-0101'
      },
      {
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@nexture-education.com',
        password: 'counselor123',
        role: 'counselor',
        department: 'counseling',
        specializations: ['uk', 'australia', 'gre', 'gmat'],
        phone: '+1-555-0102'
      },
      {
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily.rodriguez@nexture-education.com',
        password: 'staff123',
        role: 'staff',
        department: 'admissions',
        specializations: ['germany', 'europe', 'visa'],
        phone: '+1-555-0103'
      }
    ];

    for (const userData of sampleUsers) {
      const userExists = await User.findOne({ email: userData.email });
      if (!userExists) {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created user: ${userData.firstName} ${userData.lastName}`);
      }
    }
  } catch (error) {
    console.error('❌ Error creating sample users:', error);
  }
};

// Create sample blog posts
const createSampleBlogs = async () => {
  try {
    const admin = await User.findOne({ email: 'admin@nexture-education.com' });
    if (!admin) {
      console.log('❌ Admin user not found, skipping blog creation');
      return;
    }

    const sampleBlogs = [
      {
        title: 'Complete Guide to Studying in the United States',
        slug: 'complete-guide-studying-united-states',
        excerpt: 'Everything you need to know about pursuing higher education in the USA, from application process to visa requirements.',
        content: `
          <h2>Introduction</h2>
          <p>The United States remains one of the most popular destinations for international students seeking world-class education. With over 4,000 universities and colleges, the US offers unparalleled diversity in academic programs and research opportunities.</p>
          
          <h2>Why Study in the USA?</h2>
          <ul>
            <li>World-renowned universities and research facilities</li>
            <li>Diverse academic programs and flexible curriculum</li>
            <li>Cultural diversity and networking opportunities</li>
            <li>Post-graduation work opportunities</li>
          </ul>
          
          <h2>Application Process</h2>
          <p>The application process typically involves standardized tests (SAT/ACT for undergrad, GRE/GMAT for grad), English proficiency tests (TOEFL/IELTS), letters of recommendation, and personal statements.</p>
          
          <h2>Visa Requirements</h2>
          <p>International students need an F-1 student visa. The process includes acceptance to a SEVP-approved school, paying the SEVIS fee, and attending a visa interview.</p>
        `,
        category: 'study-abroad',
        tags: ['usa', 'application', 'visa', 'universities'],
        author: admin._id,
        status: 'published',
        featured: true,
        publishedAt: new Date()
      },
      {
        title: 'IELTS vs TOEFL: Which Test Should You Take?',
        slug: 'ielts-vs-toefl-which-test-should-you-take',
        excerpt: 'A comprehensive comparison of IELTS and TOEFL tests to help you choose the right English proficiency exam for your goals.',
        content: `
          <h2>Understanding the Differences</h2>
          <p>Both IELTS and TOEFL are widely accepted English proficiency tests, but they have distinct formats and scoring systems.</p>
          
          <h2>IELTS Overview</h2>
          <ul>
            <li>British Council administered</li>
            <li>Face-to-face speaking test</li>
            <li>Band score 0-9</li>
            <li>Preferred in UK, Australia, Canada</li>
          </ul>
          
          <h2>TOEFL Overview</h2>
          <ul>
            <li>ETS administered</li>
            <li>Computer-based test</li>
            <li>Score range 0-120</li>
            <li>Preferred in USA</li>
          </ul>
          
          <h2>Which Should You Choose?</h2>
          <p>Consider your target country, preferred test format, and personal strengths when making your decision.</p>
        `,
        category: 'test-preparation',
        tags: ['ielts', 'toefl', 'english-test', 'comparison'],
        author: admin._id,
        status: 'published',
        featured: true,
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        title: 'Top Scholarships for International Students in 2024',
        slug: 'top-scholarships-international-students-2024',
        excerpt: 'Discover the best scholarship opportunities available for international students pursuing higher education abroad.',
        content: `
          <h2>Merit-Based Scholarships</h2>
          <p>Many universities offer merit-based scholarships for outstanding academic performance.</p>
          
          <h2>Need-Based Financial Aid</h2>
          <p>Financial assistance based on demonstrated financial need.</p>
          
          <h2>Country-Specific Scholarships</h2>
          <ul>
            <li>Fulbright Program (USA)</li>
            <li>Chevening Scholarships (UK)</li>
            <li>Australia Awards</li>
            <li>DAAD Scholarships (Germany)</li>
          </ul>
          
          <h2>Application Tips</h2>
          <p>Start early, meet all requirements, and craft compelling personal statements.</p>
        `,
        category: 'scholarships',
        tags: ['scholarships', 'financial-aid', 'international-students'],
        author: admin._id,
        status: 'published',
        featured: false,
        publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000) // 2 days ago
      }
    ];

    for (const blogData of sampleBlogs) {
      const blogExists = await Blog.findOne({ slug: blogData.slug });
      if (!blogExists) {
        const blog = new Blog(blogData);
        await blog.save();
        console.log(`✅ Created blog post: ${blogData.title}`);
      }
    }
  } catch (error) {
    console.error('❌ Error creating sample blogs:', error);
  }
};

// Initialize database
const initializeDatabase = async () => {
  console.log('🚀 Initializing Nexture Education Database...\n');
  
  await connectDB();
  await createAdminUser();
  await createSampleUsers();
  await createSampleBlogs();
  
  console.log('\n✅ Database initialization completed successfully!');
  console.log('\n📋 Summary:');
  console.log('- Admin user created (admin@nexture-education.com / admin123)');
  console.log('- Sample counselor and staff users created');
  console.log('- Sample blog posts created');
  console.log('\n🎯 You can now start the backend server and test the application!');
  
  process.exit(0);
};

// Run initialization
initializeDatabase().catch(error => {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
});
