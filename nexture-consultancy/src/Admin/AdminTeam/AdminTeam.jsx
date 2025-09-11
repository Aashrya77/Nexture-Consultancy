import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminTeam.css';

export default function AdminTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filter, setFilter] = useState({
    status: 'all',
    search: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    specialization: '',
    bio: '',
    image: '',
    isActive: true,
    order: 0
  });

  // Configure axios defaults
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    axios.defaults.baseURL = 'http://localhost:5000';
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // CREATE & READ - Fetch all team members
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get('/api/team');
      
      if (response.data.success) {
        setTeamMembers(response.data.data || []);
      } else {
        setError(response.data.message || 'Failed to fetch team members');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching team members');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE & UPDATE - Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      
      // Validate required fields
      if (!formData.name.trim() || !formData.role.trim()) {
        setError('Name and Role are required fields');
        return;
      }

      let response;
      if (editingMember) {
        // UPDATE operation
        response = await axios.put(`/api/team/${editingMember._id}`, formData);
        setSuccess('Team member updated successfully!');
      } else {
        // CREATE operation
        response = await axios.post('/api/team', formData);
        setSuccess('Team member created successfully!');
      }

      if (response.data.success) {
        await fetchTeamMembers();
        resetForm();
        setShowForm(false);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Failed to save team member');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving team member');
      console.error('Error:', err);
    }
  };

  // UPDATE - Prepare form for editing
  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      role: member.role || '',
      experience: member.experience || '',
      specialization: member.specialization || '',
      bio: member.bio || '',
      image: member.image || '',
      isActive: member.isActive !== undefined ? member.isActive : true,
      order: member.order || 0
    });
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  // DELETE - Remove team member
  const handleDelete = async (id) => {
    try {
      setError('');
      setSuccess('');
      
      const response = await axios.delete(`/api/team/${id}`);
      
      if (response.data.success) {
        await fetchTeamMembers();
        setDeleteConfirm(null);
        setSuccess('Team member deleted successfully!');
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Failed to delete team member');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting team member');
      console.error('Error:', err);
    }
  };

  // UPDATE - Toggle member status
  const toggleStatus = async (id) => {
    try {
      setError('');
      setSuccess('');
      
      const member = teamMembers.find(m => m._id === id);
      if (!member) return;
      
      const response = await axios.put(`/api/team/${id}`, {
        ...member,
        isActive: !member.isActive
      });
      
      if (response.data.success) {
        await fetchTeamMembers();
        setSuccess(`Team member ${!member.isActive ? 'activated' : 'deactivated'} successfully!`);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Failed to toggle status');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error toggling status');
      console.error('Error:', err);
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      experience: '',
      specialization: '',
      bio: '',
      image: '',
      isActive: true,
      order: 0
    });
    setEditingMember(null);
    setError('');
    setSuccess('');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };

  // Filter team members based on status and search
  const filteredMembers = teamMembers.filter(member => {
    const matchesStatus = filter.status === 'all' || 
      (filter.status === 'active' && member.isActive) ||
      (filter.status === 'inactive' && !member.isActive);
    
    const matchesSearch = !filter.search || 
      member.name?.toLowerCase().includes(filter.search.toLowerCase()) ||
      member.role?.toLowerCase().includes(filter.search.toLowerCase()) ||
      member.specialization?.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="admin-team">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-team">
      <div className="admin-team-header">
        <div className="header-content">
          <h1>Team Members Management</h1>
          <p>Manage your team members with full CRUD operations</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <span className="btn-icon">➕</span>
          Add Team Member
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="success-message">
          <span className="success-icon">✅</span>
          {success}
          <button onClick={() => setSuccess('')} className="success-close">✕</button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
          <button onClick={() => setError('')} className="error-close">✕</button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name, role, or specialization..."
            value={filter.search}
            onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
            className="search-input"
          />
          <select
            value={filter.status}
            onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
        
        <div className="results-count">
          {filteredMembers.length} of {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="team-members-grid">
        {filteredMembers.map(member => (
          <div key={member._id} className="team-member-card">
            <div className="member-header">
              <div className="member-avatar">
                <div className="avatar-placeholder">
                  {member.image || member.name?.charAt(0) || '?'}
                </div>
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            </div>

            <div className="member-details">
              {member.experience && <p><strong>Experience:</strong> {member.experience}</p>}
              {member.specialization && <p><strong>Specialization:</strong> {member.specialization}</p>}
              {member.bio && (
                <p><strong>Bio:</strong> {member.bio.length > 100 ? `${member.bio.substring(0, 100)}...` : member.bio}</p>
              )}
              <p><strong>Order:</strong> {member.order}</p>
              <p><strong>Created:</strong> {new Date(member.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="member-status">
              <span className={`status-badge ${member.isActive ? 'active' : 'inactive'}`}>
                {member.isActive ? '✅ Active' : '❌ Inactive'}
              </span>
            </div>

            <div className="member-actions">
              <button
                onClick={() => handleEdit(member)}
                className="btn-edit"
                title="Edit member"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => toggleStatus(member._id)}
                className="btn-toggle"
                title={member.isActive ? 'Deactivate' : 'Activate'}
              >
                {member.isActive ? '⏸️ Deactivate' : '▶️ Activate'}
              </button>
              <button
                onClick={() => setDeleteConfirm(member)}
                className="btn-delete"
                title="Delete member"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>
            {teamMembers.length === 0 
              ? 'No team members found' 
              : 'No members match your filters'
            }
          </h3>
          <p>
            {teamMembers.length === 0 
              ? 'Add your first team member to get started' 
              : 'Try adjusting your search or filter criteria'
            }
          </p>
          {teamMembers.length === 0 && (
            <button 
              className="btn-primary"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              Add Team Member
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</h2>
              <button 
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="modal-close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="team-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    maxLength="100"
                    placeholder="Full name"
                  />
                </div>

                <div className="form-group">
                  <label>Role *</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    maxLength="100"
                    placeholder="e.g., Senior Education Counselor"
                  />
                </div>

                <div className="form-group">
                  <label>Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    maxLength="50"
                    placeholder="e.g., 5 years"
                  />
                </div>

                <div className="form-group">
                  <label>Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    maxLength="200"
                    placeholder="Areas of expertise"
                  />
                </div>

                <div className="form-group">
                  <label>Image (Initials)</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    maxLength="10"
                    placeholder="e.g., JS for John Smith"
                  />
                </div>

                <div className="form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    maxLength="500"
                    rows="4"
                    placeholder="Brief biography and background..."
                  />
                  <small>{formData.bio.length}/500 characters</small>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                    />
                    Active (visible on website)
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingMember ? 'Update' : 'Create'} Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
            </div>
            <div className="modal-body">
              <div className="delete-warning">
                <div className="warning-icon">⚠️</div>
                <div>
                  <p>Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?</p>
                  <p className="warning-text">This action cannot be undone and will permanently remove this team member from your system.</p>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm._id)}
                className="btn-danger"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}