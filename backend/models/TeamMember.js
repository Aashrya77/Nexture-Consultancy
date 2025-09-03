const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: [
      'counseling',
      'admissions',
      'visa-guidance',
      'test-preparation',
      'marketing',
      'operations',
      'management'
    ]
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  shortBio: {
    type: String,
    trim: true,
    maxlength: [300, 'Short bio cannot exceed 300 characters']
  },
  profileImage: {
    type: String,
    default: null
  },
  specializations: [{
    type: String,
    trim: true,
    maxlength: [100, 'Specialization cannot exceed 100 characters']
  }],
  qualifications: [{
    degree: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Degree cannot exceed 200 characters']
    },
    institution: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Institution cannot exceed 200 characters']
    },
    year: {
      type: Number,
      min: [1950, 'Year must be after 1950'],
      max: [new Date().getFullYear(), 'Year cannot be in the future']
    }
  }],
  experience: {
    years: {
      type: Number,
      min: [0, 'Experience cannot be negative'],
      max: [50, 'Experience cannot exceed 50 years']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Experience description cannot exceed 500 characters']
    }
  },
  achievements: [{
    type: String,
    trim: true,
    maxlength: [200, 'Achievement cannot exceed 200 characters']
  }],
  socialLinks: {
    linkedin: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?linkedin\.com\/.*/, 'Please enter a valid LinkedIn URL']
    },
    twitter: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?twitter\.com\/.*/, 'Please enter a valid Twitter URL']
    },
    facebook: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?facebook\.com\/.*/, 'Please enter a valid Facebook URL']
    }
  },
  languages: [{
    language: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, 'Language cannot exceed 50 characters']
    },
    proficiency: {
      type: String,
      required: true,
      enum: ['basic', 'intermediate', 'advanced', 'native']
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create indexes
teamMemberSchema.index({ email: 1 }, { unique: true });
teamMemberSchema.index({ department: 1 });
teamMemberSchema.index({ isActive: 1 });
teamMemberSchema.index({ isVisible: 1 });
teamMemberSchema.index({ order: 1 });
teamMemberSchema.index({ createdAt: -1 });

// Virtual for full name
teamMemberSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for display role
teamMemberSchema.virtual('displayRole').get(function() {
  return `${this.role} - ${this.department.charAt(0).toUpperCase() + this.department.slice(1)}`;
});

// Ensure virtual fields are serialized
teamMemberSchema.set('toJSON', { virtuals: true });
teamMemberSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
