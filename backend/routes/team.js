const express = require('express');
const { body, validationResult } = require('express-validator');
const TeamMember = require('../models/TeamMember');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/team
// @desc    Get all team members (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { department, active, visible, limit, sort } = req.query;
    
    // Build filter object
    const filter = {};
    if (department) filter.department = department;
    if (active !== undefined) filter.isActive = active === 'true';
    if (visible !== undefined) filter.isVisible = visible === 'true';
    
    // For public access, only show active and visible members
    if (!req.user || req.user.role !== 'admin') {
      filter.isActive = true;
      filter.isVisible = true;
    }
    
    let query = TeamMember.find(filter)
      .populate('createdBy', 'firstName lastName')
      .populate('updatedBy', 'firstName lastName');
    
    // Apply sorting
    if (sort) {
      const sortOptions = {
        'newest': { createdAt: -1 },
        'oldest': { createdAt: 1 },
        'order': { order: 1, createdAt: -1 },
        'name': { firstName: 1, lastName: 1 },
        'department': { department: 1, order: 1 }
      };
      query = query.sort(sortOptions[sort] || { order: 1, createdAt: -1 });
    } else {
      query = query.sort({ order: 1, createdAt: -1 });
    }
    
    // Apply limit
    if (limit && !isNaN(limit)) {
      query = query.limit(parseInt(limit));
    }
    
    const teamMembers = await query;
    
    res.json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team members'
    });
  }
});

// @route   GET /api/team/:id
// @desc    Get single team member
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id)
      .populate('createdBy', 'firstName lastName')
      .populate('updatedBy', 'firstName lastName');
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    // Check if team member is active and visible for non-admin users
    if ((!teamMember.isActive || !teamMember.isVisible) && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team member'
    });
  }
});

// @route   GET /api/team/department/:department
// @desc    Get team members by department
// @access  Public
router.get('/department/:department', async (req, res) => {
  try {
    const filter = { 
      department: req.params.department
    };
    
    // For public access, only show active and visible members
    if (!req.user || req.user.role !== 'admin') {
      filter.isActive = true;
      filter.isVisible = true;
    }
    
    const teamMembers = await TeamMember.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .populate('createdBy', 'firstName lastName')
      .populate('updatedBy', 'firstName lastName');
    
    res.json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (error) {
    console.error('Error fetching team members by department:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team members'
    });
  }
});

// Admin routes - require authentication and admin role
router.use(auth);
router.use(authorize('admin'));

// @route   POST /api/team
// @desc    Create new team member
// @access  Private/Admin
router.post('/', [
  body('firstName').trim().notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
  body('lastName').trim().notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
  body('email').isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('role').trim().notEmpty().withMessage('Role is required')
    .isLength({ max: 100 }).withMessage('Role cannot exceed 100 characters'),
  body('department').isIn([
    'counseling', 'admissions', 'visa-guidance', 'test-preparation',
    'marketing', 'operations', 'management'
  ]).withMessage('Invalid department'),
  body('bio').trim().notEmpty().withMessage('Bio is required')
    .isLength({ max: 1000 }).withMessage('Bio cannot exceed 1000 characters'),
  body('phone').optional().isLength({ max: 20 }).withMessage('Phone cannot exceed 20 characters'),
  body('shortBio').optional().isLength({ max: 300 }).withMessage('Short bio cannot exceed 300 characters')
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
    
    const teamMemberData = {
      ...req.body,
      createdBy: req.user.id
    };
    
    const teamMember = new TeamMember(teamMemberData);
    await teamMember.save();
    
    await teamMember.populate('createdBy', 'firstName lastName');
    
    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: teamMember
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A team member with this email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating team member'
    });
  }
});

// @route   PUT /api/team/:id
// @desc    Update team member
// @access  Private/Admin
router.put('/:id', [
  body('firstName').optional().trim().notEmpty().withMessage('First name cannot be empty')
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),
  body('lastName').optional().trim().notEmpty().withMessage('Last name cannot be empty')
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),
  body('email').optional().isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('role').optional().trim().notEmpty().withMessage('Role cannot be empty')
    .isLength({ max: 100 }).withMessage('Role cannot exceed 100 characters'),
  body('department').optional().isIn([
    'counseling', 'admissions', 'visa-guidance', 'test-preparation',
    'marketing', 'operations', 'management'
  ]).withMessage('Invalid department'),
  body('bio').optional().trim().notEmpty().withMessage('Bio cannot be empty')
    .isLength({ max: 1000 }).withMessage('Bio cannot exceed 1000 characters'),
  body('phone').optional().isLength({ max: 20 }).withMessage('Phone cannot exceed 20 characters'),
  body('shortBio').optional().isLength({ max: 300 }).withMessage('Short bio cannot exceed 300 characters')
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
    
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    const updateData = {
      ...req.body,
      updatedBy: req.user.id
    };
    
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'firstName lastName')
     .populate('updatedBy', 'firstName lastName');
    
    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: updatedTeamMember
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A team member with this email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating team member'
    });
  }
});

// @route   DELETE /api/team/:id
// @desc    Delete team member
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    await TeamMember.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting team member'
    });
  }
});

// @route   PATCH /api/team/:id/toggle-active
// @desc    Toggle team member active status
// @access  Private/Admin
router.patch('/:id/toggle-active', async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    teamMember.isActive = !teamMember.isActive;
    teamMember.updatedBy = req.user.id;
    await teamMember.save();
    
    res.json({
      success: true,
      message: `Team member ${teamMember.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { isActive: teamMember.isActive }
    });
  } catch (error) {
    console.error('Error toggling team member status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating team member status'
    });
  }
});

// @route   PATCH /api/team/:id/toggle-visible
// @desc    Toggle team member visibility
// @access  Private/Admin
router.patch('/:id/toggle-visible', async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    teamMember.isVisible = !teamMember.isVisible;
    teamMember.updatedBy = req.user.id;
    await teamMember.save();
    
    res.json({
      success: true,
      message: `Team member ${teamMember.isVisible ? 'made visible' : 'hidden'} successfully`,
      data: { isVisible: teamMember.isVisible }
    });
  } catch (error) {
    console.error('Error toggling team member visibility:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating team member visibility'
    });
  }
});

// @route   PATCH /api/team/reorder
// @desc    Reorder team members
// @access  Private/Admin
router.patch('/reorder', [
  body('members').isArray().withMessage('Members must be an array'),
  body('members.*.id').notEmpty().withMessage('Member ID is required'),
  body('members.*.order').isNumeric().withMessage('Order must be a number')
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
    
    const { members } = req.body;
    
    // Update order for each team member
    const updatePromises = members.map(({ id, order }) =>
      TeamMember.findByIdAndUpdate(id, { 
        order, 
        updatedBy: req.user.id 
      }, { new: true })
    );
    
    await Promise.all(updatePromises);
    
    res.json({
      success: true,
      message: 'Team members reordered successfully'
    });
  } catch (error) {
    console.error('Error reordering team members:', error);
    res.status(500).json({
      success: false,
      message: 'Error reordering team members'
    });
  }
});

module.exports = router;
