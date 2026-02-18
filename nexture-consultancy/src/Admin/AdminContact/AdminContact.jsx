import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import base_url from '../../../config';
import './AdminContact.css';

export default function AdminContact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [formData, setFormData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { authAxios } = useAuth();

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const serviceOptions = [
    { value: '', label: 'All Services' },
    { value: 'study-abroad', label: 'Study Abroad' },
    { value: 'test-preparation', label: 'Test Preparation' },
    { value: 'visa-assistance', label: 'Visa Assistance' },
    { value: 'career-counseling', label: 'Career Counseling' },
    { value: 'general-inquiry', label: 'General Inquiry' }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  useEffect(() => {
    fetchContacts();
  }, [currentPage, statusFilter, serviceFilter]);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${base_url}/api/contact?page=${currentPage}&limit=10`;
      if (statusFilter) url += `&status=${statusFilter}`;
      if (serviceFilter) url += `&serviceType=${serviceFilter}`;

      const response = await authAxios.get(url);

      if (response.data.success) {
        setContacts(response.data.data || []);
        setTotalPages(response.data.pagination?.pages || 1);
        setTotalContacts(response.data.pagination?.total || 0);
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to fetch contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setFormData({
      status: contact.status || 'new',
      urgency: contact.urgency || 'medium',
      responseNotes: contact.responseNotes || '',
      followUpDate: contact.followUpDate ? new Date(contact.followUpDate).toISOString().split('T')[0] : ''
    });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      const response = await authAxios.put(
        `${base_url}/api/contact/${selectedContact._id}`,
        formData
      );

      if (response.data.success) {
        setContacts(contacts.map(c =>
          c._id === selectedContact._id ? response.data.data : c
        ));
        setSuccess('Contact updated successfully');
        setIsModalOpen(false);
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating contact:', err);
      setError('Failed to update contact');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await authAxios.delete(`${base_url}/api/contact/${contactId}`);

      if (response.data.success) {
        setContacts(contacts.filter(c => c._id !== contactId));
        setTotalContacts(prev => prev - 1);
        setSuccess('Contact deleted successfully');
        setDeleteConfirm(null);
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError('Failed to delete contact');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const response = await authAxios.put(`${base_url}/api/contact/${contactId}`, {
        status: newStatus
      });

      if (response.data.success) {
        setContacts(contacts.map(c =>
          c._id === contactId ? { ...c, status: newStatus } : c
        ));
        setSuccess(`Status updated to ${newStatus}`);
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
      setTimeout(() => setError(null), 3000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    const map = {
      new: 'badge-new',
      'in-progress': 'badge-progress',
      resolved: 'badge-resolved',
      closed: 'badge-closed'
    };
    return map[status] || 'badge-default';
  };

  const getUrgencyClass = (urgency) => {
    const map = {
      low: 'urgency-low',
      medium: 'urgency-medium',
      high: 'urgency-high',
      urgent: 'urgency-urgent'
    };
    return map[urgency] || 'urgency-medium';
  };

  const getServiceLabel = (value) => {
    const option = serviceOptions.find(o => o.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="admin-contact-page">
      {/* Header */}
      <div className="contact-page-header">
        <div>
          <h1>Contact Management</h1>
          <p>Manage and respond to contact form submissions ({totalContacts} total)</p>
        </div>
      </div>

      {/* Messages */}
      {success && (
        <div className="contact-alert contact-alert-success">
          {success}
        </div>
      )}
      {error && (
        <div className="contact-alert contact-alert-error">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="contact-filters">
        <div className="filter-item">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label>Service Type</label>
          <select
            value={serviceFilter}
            onChange={(e) => { setServiceFilter(e.target.value); setCurrentPage(1); }}
          >
            {serviceOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button className="filter-reset" onClick={() => { setStatusFilter(''); setServiceFilter(''); setCurrentPage(1); }}>
          Reset Filters
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="contact-loading">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div className="contact-empty">
          <p>No contacts found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="contact-table-wrapper">
          <table className="contact-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Service</th>
                <th>Subject</th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id}>
                  <td className="td-name">
                    <div className="contact-name-cell">
                      <span className="contact-avatar">
                        {(contact.firstName?.[0] || '').toUpperCase()}
                      </span>
                      <span>{contact.firstName} {contact.lastName}</span>
                    </div>
                  </td>
                  <td className="td-email">{contact.email}</td>
                  <td>
                    <span className="service-tag">{getServiceLabel(contact.serviceType)}</span>
                  </td>
                  <td className="td-subject">{contact.subject}</td>
                  <td>
                    <span className={`urgency-badge ${getUrgencyClass(contact.urgency)}`}>
                      {contact.urgency || 'medium'}
                    </span>
                  </td>
                  <td>
                    <select
                      className={`status-select ${getStatusClass(contact.status)}`}
                      value={contact.status || 'new'}
                      onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                    >
                      {statusOptions.filter(o => o.value).map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="td-date">{formatDate(contact.createdAt)}</td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="act-btn act-view"
                        onClick={() => handleViewContact(contact)}
                        title="View"
                      >
                        View
                      </button>
                      <button
                        className="act-btn act-edit"
                        onClick={() => handleEditContact(contact)}
                        title="Edit"
                      >
                        Edit
                      </button>
                      {deleteConfirm === contact._id ? (
                        <div className="delete-confirm-inline">
                          <button
                            className="act-btn act-confirm-yes"
                            onClick={() => handleDeleteContact(contact._id)}
                          >
                            Yes
                          </button>
                          <button
                            className="act-btn act-confirm-no"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          className="act-btn act-delete"
                          onClick={() => setDeleteConfirm(contact._id)}
                          title="Delete"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="contact-pagination">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="page-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedContact && (
        <div className="contact-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <h2>{modalMode === 'view' ? 'Contact Details' : 'Edit Contact'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>

            <div className="modal-body">
              {modalMode === 'view' ? (
                <div className="contact-detail-view">
                  <div className="detail-section">
                    <h3>Personal Information</h3>
                    <div className="detail-grid">
                      <div className="detail-field">
                        <label>Name</label>
                        <p>{selectedContact.firstName} {selectedContact.lastName}</p>
                      </div>
                      <div className="detail-field">
                        <label>Email</label>
                        <p>{selectedContact.email}</p>
                      </div>
                      <div className="detail-field">
                        <label>Phone</label>
                        <p>{selectedContact.phone}</p>
                      </div>
                      <div className="detail-field">
                        <label>Country</label>
                        <p>{selectedContact.country}</p>
                      </div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Inquiry Details</h3>
                    <div className="detail-grid">
                      <div className="detail-field">
                        <label>Service Type</label>
                        <p>{getServiceLabel(selectedContact.serviceType)}</p>
                      </div>
                      <div className="detail-field">
                        <label>Subject</label>
                        <p>{selectedContact.subject}</p>
                      </div>
                      <div className="detail-field">
                        <label>Urgency</label>
                        <p>
                          <span className={`urgency-badge ${getUrgencyClass(selectedContact.urgency)}`}>
                            {selectedContact.urgency || 'medium'}
                          </span>
                        </p>
                      </div>
                      <div className="detail-field">
                        <label>Status</label>
                        <p>
                          <span className={`status-badge-view ${getStatusClass(selectedContact.status)}`}>
                            {selectedContact.status || 'new'}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="detail-field full-width">
                      <label>Message</label>
                      <p className="message-text">{selectedContact.message}</p>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Meta Information</h3>
                    <div className="detail-grid">
                      <div className="detail-field">
                        <label>Submitted</label>
                        <p>{formatDateTime(selectedContact.createdAt)}</p>
                      </div>
                      <div className="detail-field">
                        <label>Last Updated</label>
                        <p>{formatDateTime(selectedContact.updatedAt)}</p>
                      </div>
                      {selectedContact.followUpDate && (
                        <div className="detail-field">
                          <label>Follow-up Date</label>
                          <p>{formatDate(selectedContact.followUpDate)}</p>
                        </div>
                      )}
                    </div>
                    {selectedContact.responseNotes && (
                      <div className="detail-field full-width">
                        <label>Response Notes</label>
                        <p className="message-text">{selectedContact.responseNotes}</p>
                      </div>
                    )}
                  </div>

                  <div className="modal-actions">
                    <button
                      className="modal-btn modal-btn-primary"
                      onClick={() => {
                        handleEditContact(selectedContact);
                      }}
                    >
                      Edit Contact
                    </button>
                    <button className="modal-btn modal-btn-secondary" onClick={() => setIsModalOpen(false)}>
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateContact} className="contact-edit-form">
                  <div className="form-info-bar">
                    <strong>{selectedContact.firstName} {selectedContact.lastName}</strong>
                    <span>{selectedContact.email}</span>
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="edit-status">Status</label>
                      <select
                        id="edit-status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        {statusOptions.filter(o => o.value).map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="edit-urgency">Urgency</label>
                      <select
                        id="edit-urgency"
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      >
                        {urgencyOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="edit-followup">Follow-up Date</label>
                      <input
                        type="date"
                        id="edit-followup"
                        value={formData.followUpDate}
                        onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-field full-width">
                    <label htmlFor="edit-notes">Response Notes</label>
                    <textarea
                      id="edit-notes"
                      rows={4}
                      value={formData.responseNotes}
                      onChange={(e) => setFormData({ ...formData, responseNotes: e.target.value })}
                      placeholder="Add notes about this contact..."
                    ></textarea>
                  </div>

                  <div className="modal-actions">
                    <button type="submit" className="modal-btn modal-btn-primary">
                      Save Changes
                    </button>
                    <button type="button" className="modal-btn modal-btn-secondary" onClick={() => setIsModalOpen(false)}>
                      Cancel
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
