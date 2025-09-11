const Consultation = require('../models/Consultation');
const { validationResult } = require('express-validator');

// Create a new consultation booking
exports.createConsultation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const consultation = new Consultation(req.body);
    await consultation.save();

    res.status(201).json({
      success: true,
      message: 'Consultation booking created successfully',
      data: consultation
    });
  } catch (error) {
    console.error('Error creating consultation booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create consultation booking',
      error: error.message
    });
  }
};

// Get all consultation bookings (admin only)
exports.getAllConsultations = async (req, res) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    const queryObj = {};

    // Filter by status if provided
    if (status) {
      queryObj.status = status;
    }

    // Filter by date if provided
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      queryObj.preferredDate = { $gte: startDate, $lte: endDate };
    }

    const skip = (page - 1) * limit;
    
    const consultations = await Consultation.find(queryObj)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('assignedTo', 'firstName lastName email');
    
    const totalConsultations = await Consultation.countDocuments(queryObj);

    res.status(200).json({
      success: true,
      count: consultations.length,
      total: totalConsultations,
      totalPages: Math.ceil(totalConsultations / limit),
      currentPage: parseInt(page),
      data: consultations
    });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultations',
      error: error.message
    });
  }
};

// Get a single consultation by ID
exports.getConsultationById = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate('assignedTo', 'firstName lastName email');
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    console.error('Error fetching consultation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultation',
      error: error.message
    });
  }
};

// Update a consultation booking (admin only)
exports.updateConsultation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Consultation booking updated successfully',
      data: consultation
    });
  } catch (error) {
    console.error('Error updating consultation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update consultation',
      error: error.message
    });
  }
};

// Delete a consultation booking (admin only)
exports.deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Consultation booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete consultation',
      error: error.message
    });
  }
};

// Get consultation statistics (admin only)
exports.getConsultationStats = async (req, res) => {
  try {
    const statusStats = await Consultation.getConsultationStats();
    const typeStats = await Consultation.getConsultationTypeStats();
    
    // Get upcoming consultations for today and tomorrow
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    
    const upcomingConsultations = await Consultation.find({
      preferredDate: { $gte: today, $lt: dayAfterTomorrow },
      status: { $in: ['pending', 'confirmed'] }
    }).sort({ preferredDate: 1 });

    res.status(200).json({
      success: true,
      data: {
        statusStats,
        typeStats,
        upcomingConsultations
      }
    });
  } catch (error) {
    console.error('Error fetching consultation stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultation statistics',
      error: error.message
    });
  }
};

// Submit feedback for a consultation
exports.submitFeedback = async (req, res) => {
  try {
    const { rating, comments } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating is required and must be between 1 and 5'
      });
    }
    
    const consultation = await Consultation.findById(req.params.id);
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation booking not found'
      });
    }
    
    // Only allow feedback for completed consultations
    if (consultation.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Feedback can only be submitted for completed consultations'
      });
    }
    
    consultation.feedbackSubmitted = true;
    consultation.feedbackRating = rating;
    consultation.feedbackComments = comments || '';
    
    await consultation.save();
    
    res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: consultation
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: error.message
    });
  }
};

// Reschedule a consultation
exports.rescheduleConsultation = async (req, res) => {
  try {
    const { preferredDate, preferredTime, alternateDate } = req.body;
    
    if (!preferredDate) {
      return res.status(400).json({
        success: false,
        message: 'Preferred date is required for rescheduling'
      });
    }
    
    const consultation = await Consultation.findById(req.params.id);
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation booking not found'
      });
    }
    
    // Update consultation with new schedule
    consultation.preferredDate = preferredDate;
    if (preferredTime) consultation.preferredTime = preferredTime;
    if (alternateDate) consultation.alternateDate = alternateDate;
    consultation.status = 'rescheduled';
    
    await consultation.save();
    
    res.status(200).json({
      success: true,
      message: 'Consultation rescheduled successfully',
      data: consultation
    });
  } catch (error) {
    console.error('Error rescheduling consultation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reschedule consultation',
      error: error.message
    });
  }
};
