const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const TeamMember = require('../models/TeamMember');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require admin authentication
router.use(auth);
router.use(authorize('admin'));

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private/Admin
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalContacts,
      newContacts,
      totalConsultations,
      pendingConsultations,
      totalUsers,
      activeUsers,
      totalBlogs,
      publishedBlogs,
      totalServices,
      activeServices,
      totalTeamMembers,
      activeTeamMembers,
      totalCaseStudies,
      publishedCaseStudies
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Consultation.countDocuments(),
      Consultation.countDocuments({ consultationStatus: 'pending' }),
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      Service.countDocuments(),
      Service.countDocuments({ isActive: true }),
      TeamMember.countDocuments(),
      TeamMember.countDocuments({ isActive: true }),
      CaseStudy.countDocuments(),
      CaseStudy.countDocuments({ status: 'published' })
    ]);

    // Get recent activities
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email subject createdAt status');

    const recentConsultations = await Consultation.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email serviceType preferredDate consultationStatus')
      .populate('assignedCounselor', 'firstName lastName');

    // Get upcoming consultations
    const upcomingConsultations = await Consultation.getUpcomingConsultations(7);

    res.json({
      success: true,
      data: {
        stats: {
          contacts: {
            total: totalContacts,
            new: newContacts
          },
          consultations: {
            total: totalConsultations,
            pending: pendingConsultations,
            upcoming: upcomingConsultations.length
          },
          users: {
            total: totalUsers,
            active: activeUsers
          },
          blogs: {
            total: totalBlogs,
            published: publishedBlogs
          },
          services: {
            total: totalServices,
            active: activeServices
          },
          team: {
            total: totalTeamMembers,
            active: activeTeamMembers
          },
          caseStudies: {
            total: totalCaseStudies,
            published: publishedCaseStudies
          }
        },
        recentActivity: {
          contacts: recentContacts,
          consultations: recentConsultations
        },
        upcomingConsultations
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const role = req.query.role;
    const department = req.query.department;
    const isActive = req.query.isActive;

    let query = {};
    if (role) query.role = role;
    if (department) query.department = department;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// @route   POST /api/admin/users
// @desc    Create new user
// @access  Private/Admin
router.post('/users', [
  body('firstName').trim().isLength({ min: 1, max: 50 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1, max: 50 }).withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'counselor', 'staff']).withMessage('Invalid role'),
  body('department').isIn(['admissions', 'counseling', 'test-prep', 'visa', 'marketing', 'admin']).withMessage('Invalid department')
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

    const user = new User(req.body);
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });

  } catch (error) {
    console.error('Create user error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private/Admin
router.put('/users/:id', [
  body('firstName').optional().trim().isLength({ min: 1, max: 50 }),
  body('lastName').optional().trim().isLength({ min: 1, max: 50 }),
  body('role').optional().isIn(['admin', 'counselor', 'staff']),
  body('department').optional().isIn(['admissions', 'counseling', 'test-prep', 'visa', 'marketing', 'admin']),
  body('isActive').optional().isBoolean()
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

    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
});

// @route   GET /api/admin/analytics
// @desc    Get analytics data
// @access  Private/Admin
router.get('/analytics', async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Contact analytics
    const contactAnalytics = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            serviceType: "$serviceType"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.date": 1 }
      }
    ]);

    // Consultation analytics
    const consultationAnalytics = await Consultation.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            serviceType: "$serviceType",
            status: "$consultationStatus"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.date": 1 }
      }
    ]);

    // Blog analytics
    const blogAnalytics = await Blog.aggregate([
      {
        $match: {
          status: 'published'
        }
      },
      {
        $group: {
          _id: "$category",
          totalViews: { $sum: "$views" },
          totalLikes: { $sum: "$likes" },
          postCount: { $sum: 1 }
        }
      },
      {
        $sort: { totalViews: -1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        contacts: contactAnalytics,
        consultations: consultationAnalytics,
        blogs: blogAnalytics,
        period: days
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics data'
    });
  }
});

// @route   GET /api/admin/reports
// @desc    Generate reports
// @access  Private/Admin
router.get('/reports', async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    
    let query = {};
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    let data;
    switch (type) {
      case 'contacts':
        data = await Contact.find(query)
          .populate('assignedTo', 'firstName lastName')
          .sort({ createdAt: -1 });
        break;
      
      case 'consultations':
        data = await Consultation.find(query)
          .populate('assignedCounselor', 'firstName lastName')
          .sort({ createdAt: -1 });
        break;
      
      case 'users':
        data = await User.find(query).sort({ createdAt: -1 });
        break;
      
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    res.json({
      success: true,
      data: {
        type,
        records: data,
        count: data.length,
        dateRange: { startDate, endDate }
      }
    });

  } catch (error) {
    console.error('Generate report error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate report'
    });
  }
});

module.exports = router;
