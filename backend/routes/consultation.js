const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const consultationController = require('../Controllers/Consultation');
const { authenticate, authorize } = require('../middleware/auth');

// Validation middleware
const consultationValidation = [
  check('firstName', 'First name is required').notEmpty().trim().escape(),
  check('lastName', 'Last name is required').notEmpty().trim().escape(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('phone', 'Phone number is required').notEmpty().trim(),
  check('preferredDate', 'Preferred date is required').isISO8601().toDate(),
  check('preferredTime', 'Preferred time is required').isIn(['morning', 'afternoon', 'evening']),
  check('consultationType', 'Consultation type is required').isIn([
    'study-abroad', 'test-preparation', 'visa-assistance', 'career-counseling', 'scholarship', 'general-inquiry'
  ]),
  check('consultationMode', 'Consultation mode is required').isIn(['in-person', 'video-call', 'phone-call'])
];

// Public routes
// POST /api/consultation - Create a new consultation booking
router.post('/', consultationValidation, consultationController.createConsultation);

// POST /api/consultation/:id/feedback - Submit feedback for a completed consultation
router.post('/:id/feedback', [
  check('rating', 'Rating is required and must be between 1 and 5').isInt({ min: 1, max: 5 }),
  check('comments', 'Comments cannot exceed 1000 characters').optional().isLength({ max: 1000 })
], consultationController.submitFeedback);

// POST /api/consultation/:id/reschedule - Reschedule a consultation
router.post('/:id/reschedule', [
  check('preferredDate', 'Preferred date is required').isISO8601().toDate(),
  check('preferredTime', 'Preferred time is required').optional().isIn(['morning', 'afternoon', 'evening'])
], consultationController.rescheduleConsultation);

// Protected admin routes
// GET /api/consultation - Get all consultations (admin only)
router.get('/', authenticate, authorize('admin'), consultationController.getAllConsultations);

// GET /api/consultation/stats - Get consultation statistics (admin only)
router.get('/stats', authenticate, authorize('admin'), consultationController.getConsultationStats);

// GET /api/consultation/:id - Get a single consultation by ID (admin only)
router.get('/:id', authenticate, authorize('admin'), consultationController.getConsultationById);

// PUT /api/consultation/:id - Update a consultation (admin only)
router.put('/:id', authenticate, authorize('admin'), consultationValidation, consultationController.updateConsultation);

// DELETE /api/consultation/:id - Delete a consultation (admin only)
router.delete('/:id', authenticate, authorize('admin'), consultationController.deleteConsultation);

module.exports = router;
