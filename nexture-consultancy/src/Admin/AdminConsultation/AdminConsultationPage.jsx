import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import base_url from '../../../config';
import './AdminConsultationPage.css';

export default function AdminConsultationPage() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [actionType, setActionType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { authAxios } = useAuth();
  const navigate = useNavigate();

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'rescheduled', label: 'Rescheduled' }
  ];

  const consultationTypes = [
    { value: 'study-abroad', label: 'Study Abroad Counseling' },
    { value: 'test-preparation', label: 'Test Preparation' },
    { value: 'visa-assistance', label: 'Visa Assistance' },
    { value: 'career-counseling', label: 'Career Counseling' },
    { value: 'scholarship', label: 'Scholarship Guidance' },
    { value: 'general-inquiry', label: 'General Inquiry' }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning (9:00 AM - 12:00 PM)' },
    { value: 'afternoon', label: 'Afternoon (1:00 PM - 4:00 PM)' },
    { value: 'evening', label: 'Evening (5:00 PM - 7:00 PM)' }
  ];

  const consultationModes = [
    { value: 'video-call', label: 'Video Call' },
    { value: 'phone-call', label: 'Phone Call' },
    { value: 'in-person', label: 'In-Person' }
  ];

  // Fetch consultations with filters
  const fetchConsultations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `${base_url}/api/consultation?page=${currentPage}`;
      
      if (statusFilter) {
        url += `&status=${statusFilter}`;
      }
      
      if (dateFilter) {
        url += `&date=${dateFilter}`;
      }
      
      const response = await authAxios.get(url);
      
      if (response.data.success) {
        setConsultations(response.data.data);
        setTotalPages(response.data.totalPages);
      } else {
        setError('Failed to fetch consultations');
      }
    } catch (err) {
      console.error('Error fetching consultations:', err);
      setError('Failed to fetch consultations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch consultation stats
  const fetchConsultationStats = async () => {
    try {
      const response = await authAxios.get(`${base_url}/api/consultation/stats`);
      
      if (response.data.success) {
        // Process stats data if needed
        console.log('Stats:', response.data.data);
      }
    } catch (err) {
      console.error('Error fetching consultation stats:', err);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchConsultations();
    fetchConsultationStats();
  }, [currentPage, statusFilter, dateFilter]);

  // Handle filter changes
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // View consultation details
  const handleViewConsultation = (consultation) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
    setActionType('view');
  };

  // Edit consultation
  const handleEditConsultation = (consultation) => {
    setSelectedConsultation(consultation);
    setFormData({
      ...consultation,
      preferredDate: consultation.preferredDate ? new Date(consultation.preferredDate).toISOString().split('T')[0] : '',
      alternateDate: consultation.alternateDate ? new Date(consultation.alternateDate).toISOString().split('T')[0] : ''
    });
    setIsModalOpen(true);
    setActionType('edit');
  };

  // Update consultation status
  const handleUpdateStatus = async (consultationId, newStatus) => {
    try {
      const response = await authAxios.put(`${base_url}/api/consultation/${consultationId}`, {
        status: newStatus
      });
      
      if (response.data.success) {
        // Update the consultation in the state
        setConsultations(consultations.map(c => 
          c._id === consultationId ? { ...c, status: newStatus } : c
        ));
        
        setSuccessMessage(`Consultation status updated to ${newStatus}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error updating consultation status:', err);
      setError('Failed to update consultation status');
      setTimeout(() => setError(null), 3000);
    }
  };

  // Delete consultation
  const handleDeleteConsultation = async (consultationId) => {
    if (window.confirm('Are you sure you want to delete this consultation?')) {
      try {
        const response = await authAxios.delete(`${base_url}/api/consultation/${consultationId}`);
        
        if (response.data.success) {
          // Remove the consultation from the state
          setConsultations(consultations.filter(c => c._id !== consultationId));
          
          setSuccessMessage('Consultation deleted successfully');
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      } catch (err) {
        console.error('Error deleting consultation:', err);
        setError('Failed to delete consultation');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
    if (!formData.email?.trim()) errors.email = 'Email is required';
    if (!formData.phone?.trim()) errors.phone = 'Phone number is required';
    if (!formData.preferredDate) errors.preferredDate = 'Preferred date is required';
    if (!formData.preferredTime) errors.preferredTime = 'Preferred time is required';
    if (!formData.consultationType) errors.consultationType = 'Consultation type is required';
    if (!formData.consultationMode) errors.consultationMode = 'Consultation mode is required';
    
    return errors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      const response = await authAxios.put(`${base_url}/api/consultation/${selectedConsultation._id}`, formData);
      
      if (response.data.success) {
        // Update the consultation in the state
        setConsultations(consultations.map(c => 
          c._id === selectedConsultation._id ? response.data.data : c
        ));
        
        setSuccessMessage('Consultation updated successfully');
        setIsModalOpen(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error updating consultation:', err);
      setError('Failed to update consultation');
      setTimeout(() => setError(null), 3000);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get consultation type label
  const getConsultationTypeLabel = (value) => {
    const type = consultationTypes.find(t => t.value === value);
    return type ? type.label : value;
  };

  // Get time slot label
  const getTimeSlotLabel = (value) => {
    const slot = timeSlots.find(s => s.value === value);
    return slot ? slot.label : value;
  };

  // Get consultation mode label
  const getConsultationModeLabel = (value) => {
    const mode = consultationModes.find(m => m.value === value);
    return mode ? mode.label : value;
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge pending';
      case 'confirmed':
        return 'status-badge confirmed';
      case 'completed':
        return 'status-badge completed';
      case 'cancelled':
        return 'status-badge cancelled';
      case 'rescheduled':
        return 'status-badge rescheduled';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="admin-consultation-page">
      <div className="admin-consultation-header">
        <h1>Consultation Management</h1>
        <p>Manage and track all consultation bookings</p>
      </div>
      
      {successMessage && (
        <div className="admin-consultation-success-message">
          ✅ {successMessage}
        </div>
      )}
      
      {error && (
        <div className="admin-consultation-error-message">
          ❌ {error}
        </div>
      )}
      
      <div className="admin-consultation-filters">
        <div className="filter-group">
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="filter-select"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="dateFilter">Filter by Date:</label>
          <input
            type="date"
            id="dateFilter"
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="filter-input"
          />
        </div>
      </div>
      
      {loading ? (
        <div className="admin-consultation-loading">
          Loading consultations...
        </div>
      ) : consultations.length === 0 ? (
        <div className="admin-consultation-empty">
          No consultations found. Try adjusting your filters.
        </div>
      ) : (
        <div className="admin-consultation-table-container">
          <table className="admin-consultation-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map(consultation => (
                <tr key={consultation._id}>
                  <td>{`${consultation.firstName} ${consultation.lastName}`}</td>
                  <td>{consultation.email}</td>
                  <td>{consultation.phone}</td>
                  <td>{getConsultationTypeLabel(consultation.consultationType)}</td>
                  <td>{formatDate(consultation.preferredDate)}</td>
                  <td>{getTimeSlotLabel(consultation.preferredTime)}</td>
                  <td>
                    <span className={getStatusBadgeClass(consultation.status)}>
                      {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button
                      onClick={() => handleViewConsultation(consultation)}
                      className="view-button"
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleEditConsultation(consultation)}
                      className="edit-button"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteConsultation(consultation._id)}
                      className="delete-button"
                      title="Delete"
                    >
                      🗑️
                    </button>
                    <div className="status-dropdown">
                      <button className="status-button" title="Update Status">
                        📋
                      </button>
                      <div className="status-dropdown-content">
                        {statusOptions.filter(option => option.value && option.value !== consultation.status).map(option => (
                          <button
                            key={option.value}
                            onClick={() => handleUpdateStatus(consultation._id, option.value)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="admin-consultation-pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
      
      {/* Modal for viewing/editing consultation */}
      {isModalOpen && (
        <div className="admin-consultation-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{actionType === 'view' ? 'Consultation Details' : 'Edit Consultation'}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="close-button"
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              {actionType === 'view' ? (
                <div className="consultation-details">
                  <div className="detail-group">
                    <h3>Personal Information</h3>
                    <div className="detail-row">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{`${selectedConsultation.firstName} ${selectedConsultation.lastName}`}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{selectedConsultation.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">{selectedConsultation.phone}</span>
                    </div>
                  </div>
                  
                  <div className="detail-group">
                    <h3>Consultation Information</h3>
                    <div className="detail-row">
                      <span className="detail-label">Type:</span>
                      <span className="detail-value">{getConsultationTypeLabel(selectedConsultation.consultationType)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Mode:</span>
                      <span className="detail-value">{getConsultationModeLabel(selectedConsultation.consultationMode)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Preferred Date:</span>
                      <span className="detail-value">{formatDate(selectedConsultation.preferredDate)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Alternate Date:</span>
                      <span className="detail-value">{formatDate(selectedConsultation.alternateDate)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Preferred Time:</span>
                      <span className="detail-value">{getTimeSlotLabel(selectedConsultation.preferredTime)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Status:</span>
                      <span className={`detail-value ${getStatusBadgeClass(selectedConsultation.status)}`}>
                        {selectedConsultation.status.charAt(0).toUpperCase() + selectedConsultation.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  {selectedConsultation.message && (
                    <div className="detail-group">
                      <h3>Additional Information</h3>
                      <div className="detail-message">{selectedConsultation.message}</div>
                    </div>
                  )}
                  
                  {selectedConsultation.consultationNotes && (
                    <div className="detail-group">
                      <h3>Consultation Notes</h3>
                      <div className="detail-message">{selectedConsultation.consultationNotes}</div>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="consultation-edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        className={formErrors.firstName ? 'error' : ''}
                      />
                      {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        className={formErrors.lastName ? 'error' : ''}
                      />
                      {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className={formErrors.email ? 'error' : ''}
                      />
                      {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className={formErrors.phone ? 'error' : ''}
                      />
                      {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="consultationType">Consultation Type *</label>
                      <select
                        id="consultationType"
                        name="consultationType"
                        value={formData.consultationType || ''}
                        onChange={handleInputChange}
                        className={formErrors.consultationType ? 'error' : ''}
                      >
                        {consultationTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {formErrors.consultationType && <span className="error-message">{formErrors.consultationType}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="consultationMode">Consultation Mode *</label>
                      <select
                        id="consultationMode"
                        name="consultationMode"
                        value={formData.consultationMode || ''}
                        onChange={handleInputChange}
                        className={formErrors.consultationMode ? 'error' : ''}
                      >
                        {consultationModes.map(mode => (
                          <option key={mode.value} value={mode.value}>
                            {mode.label}
                          </option>
                        ))}
                      </select>
                      {formErrors.consultationMode && <span className="error-message">{formErrors.consultationMode}</span>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredDate">Preferred Date *</label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate || ''}
                        onChange={handleInputChange}
                        className={formErrors.preferredDate ? 'error' : ''}
                      />
                      {formErrors.preferredDate && <span className="error-message">{formErrors.preferredDate}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="alternateDate">Alternate Date</label>
                      <input
                        type="date"
                        id="alternateDate"
                        name="alternateDate"
                        value={formData.alternateDate || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredTime">Preferred Time *</label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime || ''}
                        onChange={handleInputChange}
                        className={formErrors.preferredTime ? 'error' : ''}
                      >
                        {timeSlots.map(slot => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                      {formErrors.preferredTime && <span className="error-message">{formErrors.preferredTime}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="status">Status *</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status || ''}
                        onChange={handleInputChange}
                      >
                        {statusOptions.filter(option => option.value).map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="consultationNotes">Consultation Notes</label>
                    <textarea
                      id="consultationNotes"
                      name="consultationNotes"
                      value={formData.consultationNotes || ''}
                      onChange={handleInputChange}
                      rows={4}
                    ></textarea>
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-button">
                      Cancel
                    </button>
                    <button type="submit" className="save-button">
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
