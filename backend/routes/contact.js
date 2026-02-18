const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit a new contact form (public)
// @access  Public
router.post('/', [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('country').trim().notEmpty().withMessage('Country is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('serviceType').isIn(['study-abroad', 'test-preparation', 'visa-assistance', 'career-counseling', 'general-inquiry']).withMessage('Invalid service type'),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const contact = new Contact({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form'
    });
  }
});

// Admin routes - require authentication
router.use(authenticate);
router.use(authorize('admin'));

// @route   GET /api/contact
// @desc    Get all contacts (admin)
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const serviceType = req.query.serviceType;

    let query = {};
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('assignedTo', 'username email');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// @route   GET /api/contact/stats
// @desc    Get contact statistics (admin)
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const statusStats = await Contact.getContactStats();
    const serviceTypeStats = await Contact.getServiceTypeStats();
    const total = await Contact.countDocuments();

    res.json({
      success: true,
      data: {
        total,
        statusStats,
        serviceTypeStats
      }
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact statistics'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact (admin)
// @access  Private/Admin
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'username email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact (admin)
// @access  Private/Admin
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact'
    });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact (admin)
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact'
    });
  }
});

module.exports = router;
