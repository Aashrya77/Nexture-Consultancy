const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'study-abroad',
      'test-preparation',
      'visa-guidance',
      'career-counseling',
      'university-selection',
      'application-assistance',
      'scholarship-guidance',
      'document-preparation'
    ]
  },
  price: {
    amount: {
      type: Number,
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NPR']
    },
    type: {
      type: String,
      enum: ['fixed', 'hourly', 'consultation', 'free'],
      default: 'consultation'
    }
  },
  duration: {
    type: String,
    trim: true,
    maxlength: [100, 'Duration cannot exceed 100 characters']
  },
  features: [{
    type: String,
    trim: true,
    maxlength: [200, 'Feature cannot exceed 200 characters']
  }],
  image: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  seoTitle: {
    type: String,
    trim: true,
    maxlength: [60, 'SEO title cannot exceed 60 characters']
  },
  seoDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'SEO description cannot exceed 160 characters']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  }],
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
serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ order: 1 });
serviceSchema.index({ createdAt: -1 });

// Pre-save middleware to generate slug from title
serviceSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

// Virtual for full price display
serviceSchema.virtual('displayPrice').get(function() {
  if (!this.price.amount) return 'Contact for pricing';
  
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    NPR: 'Rs.'
  };
  
  const symbol = symbols[this.price.currency] || this.price.currency;
  const typeText = this.price.type === 'hourly' ? '/hour' : 
                   this.price.type === 'consultation' ? '/consultation' : '';
  
  return `${symbol}${this.price.amount}${typeText}`;
});

// Ensure virtual fields are serialized
serviceSchema.set('toJSON', { virtuals: true });
serviceSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Service', serviceSchema);
