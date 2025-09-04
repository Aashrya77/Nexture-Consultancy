const express = require('express');
const { body, validationResult } = require('express-validator');
const TeamMember = require('../models/TeamMember');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/team
// @desc    Get all active team members (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
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

// Admin routes - require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

// @route   POST /api/team
// @desc    Create new team member
// @access  Private/Admin
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  body('role').trim().notEmpty().withMessage('Role is required')
    .isLength({ max: 100 }).withMessage('Role cannot exceed 100 characters'),
  body('experience').optional().isLength({ max: 50 }).withMessage('Experience cannot exceed 50 characters'),
  body('specialization').optional().isLength({ max: 200 }).withMessage('Specialization cannot exceed 200 characters'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('image').optional().isLength({ max: 10 }).withMessage('Image initials cannot exceed 10 characters')
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
    
    const teamMember = new TeamMember(req.body);
    await teamMember.save();
    
    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: teamMember
    });
  } catch (error) {
    console.error('Error creating team member:', error);
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
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  body('role').optional().trim().notEmpty().withMessage('Role cannot be empty')
    .isLength({ max: 100 }).withMessage('Role cannot exceed 100 characters'),
  body('experience').optional().isLength({ max: 50 }).withMessage('Experience cannot exceed 50 characters'),
  body('specialization').optional().isLength({ max: 200 }).withMessage('Specialization cannot exceed 200 characters'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('image').optional().isLength({ max: 10 }).withMessage('Image initials cannot exceed 10 characters')
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
    
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: teamMember
    });
  } catch (error) {
    console.error('Error updating team member:', error);
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
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }
    
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

module.exports = router;