import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminTeam.css';

export default function AdminTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filter, setFilter] = useState({
    status: 'all'
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
  }, [filter]);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get('/api/team');
      
      if (response.data.success) {
        setTeamMembers(response.data.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      
      let response;
      if (editingMember) {
        response = await axios.put(`/api/team/${editingMember._id}`, formData);
      } else {
        response = await axios.post('/api/team', formData);
      }

      if (response.data.success) {
        fetchTeamMembers();
        resetForm();
        setShowForm(false);
      } else {
        setError(response.data.message || 'Failed to save team member');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving team member');
      console.error('Error:', err);
    }
  };

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
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      
      const response = await axios.delete(`/api/team/${id}`);
      
      if (response.data.success) {
        fetchTeamMembers();
        setDeleteConfirm(null);
      } else {
        setError(response.data.message || 'Failed to delete team member');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting team member');
      console.error('Error:', err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      setError('');
      
      // Find the current member to toggle their status
      const member = teamMembers.find(m => m._id === id);
      if (!member) return;
      
      const response = await axios.put(`/api/team/${id}`, {
        isActive: !member.isActive
      });
      
      if (response.data.success) {
        fetchTeamMembers();
      } else {
        setError(response.data.message || 'Failed to toggle status');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error toggling status');
      console.error('Error:', err);
    }
  };

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
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };


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
          <p>Manage your team members and their information</p>
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

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
          <button onClick={() => setError('')} className="error-close">✕</button>
        </div>
      )}

      {/* Filters */}
      <div className="filters-section">
        <div className="filters">
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
          {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Team Members List */}
      <div className="team-members-grid">
        {teamMembers.map(member => (
          <div key={member._id} className="team-member-card">
            <div className="member-header">
              <div className="member-avatar">
                {member.image ? (
                  <div className="avatar-placeholder">
                    {member.image}
                  </div>
                ) : (
                  <div className="avatar-placeholder">
                    {member.name?.charAt(0) || '?'}
                  </div>
                )}
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            </div>

            <div className="member-details">
              {member.experience && <p><strong>Experience:</strong> {member.experience}</p>}
              {member.specialization && <p><strong>Specialization:</strong> {member.specialization}</p>}
              {member.bio && <p><strong>Bio:</strong> {member.bio.substring(0, 100)}...</p>}
              <p><strong>Order:</strong> {member.order}</p>
            </div>

            <div className="member-status">
              <div className="status-indicators">
                <span className={`status-badge ${member.isActive ? 'active' : 'inactive'}`}>
                  {member.isActive ? '✅ Active' : '❌ Inactive'}
                </span>
              </div>
            </div>

            <div className="member-actions">
              <button
                onClick={() => handleEdit(member)}
                className="btn-edit"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => toggleStatus(member._id)}
                className="btn-toggle"
                title={member.isActive ? 'Deactivate' : 'Activate'}
              >
                {member.isActive ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={() => setDeleteConfirm(member)}
                className="btn-delete"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {teamMembers.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No team members found</h3>
          <p>Add your first team member to get started</p>
          <button 
            className="btn-primary"
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            Add Team Member
          </button>
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
                    placeholder="Brief biography..."
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                    />
                    Active
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
              <p>Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?</p>
              <p className="warning-text">This action cannot be undone.</p>
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
