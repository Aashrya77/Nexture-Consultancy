const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
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
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required']
  },
  alternateDate: {
    type: Date,
    required: false
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required'],
    enum: ['morning', 'afternoon', 'evening']
  },
  consultationType: {
    type: String,
    required: [true, 'Consultation type is required'],
    enum: ['study-abroad', 'test-preparation', 'visa-assistance', 'career-counseling', 'scholarship', 'general-inquiry'],
    default: 'general-inquiry'
  },
  countryOfInterest: {
    type: String,
    trim: true,
    maxlength: [100, 'Country name cannot exceed 100 characters']
  },
  academicLevel: {
    type: String,
    enum: ['high-school', 'bachelors', 'masters', 'phd', 'other'],
    required: false
  },
  consultationMode: {
    type: String,
    enum: ['in-person', 'video-call', 'phone-call'],
    required: [true, 'Consultation mode is required'],
    default: 'video-call'
  },
  message: {
    type: String,
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'pending'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  consultationNotes: {
    type: String,
    trim: true,
    maxlength: [2000, 'Consultation notes cannot exceed 2000 characters']
  },
  followUpDate: {
    type: Date,
    default: null
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  feedbackSubmitted: {
    type: Boolean,
    default: false
  },
  feedbackRating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  feedbackComments: {
    type: String,
    trim: true,
    maxlength: [1000, 'Feedback comments cannot exceed 1000 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
consultationSchema.index({ email: 1 });
consultationSchema.index({ status: 1 });
consultationSchema.index({ preferredDate: 1 });
consultationSchema.index({ createdAt: -1 });
consultationSchema.index({ assignedTo: 1 });

// Virtual for full name
consultationSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Static methods
consultationSchema.statics.getConsultationStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

consultationSchema.statics.getConsultationTypeStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$consultationType',
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model('Consultation', consultationSchema);
