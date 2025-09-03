const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/email');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('firstName').trim().isLength({ min: 1, max: 50 }).withMessage('First name is required and must be less than 50 characters'),
  body('lastName').trim().isLength({ min: 1, max: 50 }).withMessage('Last name is required and must be less than 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').trim().isLength({ min: 1, max: 20 }).withMessage('Phone number is required and must be less than 20 characters'),
  body('country').trim().isLength({ min: 1, max: 100 }).withMessage('Country is required'),
  body('subject').trim().isLength({ min: 1, max: 200 }).withMessage('Subject is required and must be less than 200 characters'),
  body('serviceType').isIn(['study-abroad', 'test-preparation', 'visa-assistance', 'career-counseling', 'general-inquiry']).withMessage('Invalid service type'),
  body('urgency').optional().isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid urgency level'),
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message is required and must be less than 2000 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      subject,
      serviceType,
      urgency,
      message
    } = req.body;

    // Create contact record
    const contact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      country,
      subject,
      serviceType,
      urgency: urgency || 'medium',
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send notification email to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission - ${subject}`,
        template: 'contact-notification',
        data: {
          contact: contact.toObject(),
          fullName: contact.fullName
        }
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email fails
    }

    // Send confirmation email to user
    try {
      await sendEmail({
        to: email,
        subject: 'Thank you for contacting Nexture Education',
        template: 'contact-confirmation',
        data: {
          firstName,
          subject
        }
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
      data: {
        id: contact._id,
        status: contact.status
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contacts (Admin only)
// @access  Private/Admin
router.get('/', auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const serviceType = req.query.serviceType;
    const search = req.query.search;

    // Build query
    let query = {};
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(query)
      .populate('assignedTo', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
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
// @desc    Get contact statistics
// @access  Private/Admin
router.get('/stats', auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const [statusStats, serviceStats] = await Promise.all([
      Contact.getContactStats(),
      Contact.getServiceTypeStats()
    ]);

    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const urgentContacts = await Contact.countDocuments({ urgency: 'urgent' });

    res.json({
      success: true,
      data: {
        total: totalContacts,
        new: newContacts,
        urgent: urgentContacts,
        statusBreakdown: statusStats,
        serviceBreakdown: serviceStats
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

// @route   PUT /api/contact/:id
// @desc    Update contact status/assignment
// @access  Private/Admin
router.put('/:id', auth, authorize('admin', 'staff'), [
  body('status').optional().isIn(['new', 'in-progress', 'resolved', 'closed']).withMessage('Invalid status'),
  body('assignedTo').optional().isMongoId().withMessage('Invalid user ID'),
  body('responseNotes').optional().trim().isLength({ max: 1000 }).withMessage('Response notes must be less than 1000 characters'),
  body('followUpDate').optional().isISO8601().withMessage('Invalid follow-up date')
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

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'firstName lastName email');

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
// @desc    Delete contact
// @access  Private/Admin
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
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
