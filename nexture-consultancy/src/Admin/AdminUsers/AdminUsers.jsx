import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import base_url from '../../../config';
import './AdminUsers.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const [createForm, setCreateForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    isActive: true
  });

  const [formErrors, setFormErrors] = useState({});
  const { authAxios, user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAxios.get(`${base_url}/api/admin/users?page=${currentPage}&limit=10`);
      if (response.data.success) {
        setUsers(response.data.data.users || []);
        setTotalPages(response.data.data.pagination?.pages || 1);
        setTotalUsers(response.data.data.pagination?.total || 0);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch admin accounts.');
    } finally {
      setLoading(false);
    }
  };

  const validateCreateForm = () => {
    const errors = {};
    if (!createForm.username.trim()) {
      errors.username = 'Username is required';
    } else if (createForm.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    if (!createForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(createForm.email)) {
      errors.email = 'Invalid email format';
    }
    if (!createForm.password) {
      errors.password = 'Password is required';
    } else if (createForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (createForm.password !== createForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!validateCreateForm()) return;

    try {
      const response = await authAxios.post(`${base_url}/api/admin/users`, {
        username: createForm.username,
        email: createForm.email,
        password: createForm.password
      });

      if (response.data.success) {
        setSuccess('Admin account created successfully');
        setShowCreateModal(false);
        setCreateForm({ username: '', email: '', password: '', confirmPassword: '' });
        setFormErrors({});
        fetchUsers();
        setTimeout(() => setSuccess(''), 4000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to create admin account';
      setFormErrors({ submit: msg });
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      isActive: user.isActive
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!editForm.username.trim() || editForm.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    if (!editForm.email.trim() || !/^\S+@\S+\.\S+$/.test(editForm.email)) {
      errors.email = 'Valid email is required';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await authAxios.put(`${base_url}/api/admin/users/${selectedUser._id}`, editForm);
      if (response.data.success) {
        setSuccess('Admin account updated successfully');
        setShowEditModal(false);
        setFormErrors({});
        fetchUsers();
        setTimeout(() => setSuccess(''), 4000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update admin account';
      setFormErrors({ submit: msg });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (userId === currentUser?._id || userId === currentUser?.id) {
      setError("You cannot delete your own account");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const response = await authAxios.delete(`${base_url}/api/admin/users/${userId}`);
      if (response.data.success) {
        setSuccess('Admin account deleted successfully');
        setDeleteConfirm(null);
        fetchUsers();
        setTimeout(() => setSuccess(''), 4000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete admin account');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleToggleActive = async (user) => {
    if (user._id === currentUser?._id || user._id === currentUser?.id) {
      setError("You cannot deactivate your own account");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const response = await authAxios.put(`${base_url}/api/admin/users/${user._id}`, {
        isActive: !user.isActive
      });
      if (response.data.success) {
        setUsers(users.map(u => u._id === user._id ? { ...u, isActive: !u.isActive } : u));
        setSuccess(`Account ${user.isActive ? 'deactivated' : 'activated'} successfully`);
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to update account status');
      setTimeout(() => setError(null), 3000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="admin-users-page">
      <div className="users-header">
        <div>
          <h1>Admin Accounts</h1>
          <p>Manage administrator accounts ({totalUsers} total)</p>
        </div>
        <button className="create-user-btn" onClick={() => { setShowCreateModal(true); setFormErrors({}); setCreateForm({ username: '', email: '', password: '', confirmPassword: '' }); }}>
          + Create Admin
        </button>
      </div>

      {success && <div className="users-alert users-alert-success">{success}</div>}
      {error && <div className="users-alert users-alert-error">{error}</div>}

      {loading ? (
        <div className="users-loading">Loading admin accounts...</div>
      ) : users.length === 0 ? (
        <div className="users-empty">No admin accounts found.</div>
      ) : (
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>
                    <div className="user-name-cell">
                      <span className="user-avatar-sm">{(user.username?.[0] || 'A').toUpperCase()}</span>
                      <span className="user-username">{user.username}</span>
                      {(user._id === currentUser?._id || user._id === currentUser?.id) && (
                        <span className="you-badge">You</span>
                      )}
                    </div>
                  </td>
                  <td className="td-email">{user.email}</td>
                  <td>
                    <button
                      className={`status-toggle ${user.isActive ? 'active' : 'inactive'}`}
                      onClick={() => handleToggleActive(user)}
                      title={user.isActive ? 'Click to deactivate' : 'Click to activate'}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="td-date">{formatDate(user.lastLogin)}</td>
                  <td className="td-date">{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="user-actions">
                      <button className="ua-btn ua-edit" onClick={() => handleEditUser(user)}>Edit</button>
                      {deleteConfirm === user._id ? (
                        <div className="delete-confirm-inline">
                          <button className="ua-btn ua-yes" onClick={() => handleDeleteUser(user._id)}>Yes</button>
                          <button className="ua-btn ua-no" onClick={() => setDeleteConfirm(null)}>No</button>
                        </div>
                      ) : (
                        <button
                          className="ua-btn ua-delete"
                          onClick={() => setDeleteConfirm(user._id)}
                          disabled={user._id === currentUser?._id || user._id === currentUser?.id}
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

      {totalPages > 1 && (
        <div className="users-pagination">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="page-btn">Previous</button>
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="page-btn">Next</button>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="users-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="users-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-top">
              <h2>Create Admin Account</h2>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleCreateUser} className="users-form">
              {formErrors.submit && <div className="form-error-banner">{formErrors.submit}</div>}

              <div className="form-field">
                <label htmlFor="create-username">Username</label>
                <input
                  id="create-username"
                  type="text"
                  value={createForm.username}
                  onChange={e => setCreateForm({ ...createForm, username: e.target.value })}
                  placeholder="Enter username"
                />
                {formErrors.username && <span className="field-error">{formErrors.username}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="create-email">Email</label>
                <input
                  id="create-email"
                  type="email"
                  value={createForm.email}
                  onChange={e => setCreateForm({ ...createForm, email: e.target.value })}
                  placeholder="Enter email address"
                />
                {formErrors.email && <span className="field-error">{formErrors.email}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="create-password">Password</label>
                <input
                  id="create-password"
                  type="password"
                  value={createForm.password}
                  onChange={e => setCreateForm({ ...createForm, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                />
                {formErrors.password && <span className="field-error">{formErrors.password}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="create-confirm">Confirm Password</label>
                <input
                  id="create-confirm"
                  type="password"
                  value={createForm.confirmPassword}
                  onChange={e => setCreateForm({ ...createForm, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                />
                {formErrors.confirmPassword && <span className="field-error">{formErrors.confirmPassword}</span>}
              </div>

              <div className="modal-actions">
                <button type="submit" className="modal-btn modal-btn-primary">Create Account</button>
                <button type="button" className="modal-btn modal-btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedUser && (
        <div className="users-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="users-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-top">
              <h2>Edit Admin Account</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleUpdateUser} className="users-form">
              {formErrors.submit && <div className="form-error-banner">{formErrors.submit}</div>}

              <div className="form-field">
                <label htmlFor="edit-username">Username</label>
                <input
                  id="edit-username"
                  type="text"
                  value={editForm.username}
                  onChange={e => setEditForm({ ...editForm, username: e.target.value })}
                />
                {formErrors.username && <span className="field-error">{formErrors.username}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="edit-email">Email</label>
                <input
                  id="edit-email"
                  type="email"
                  value={editForm.email}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                />
                {formErrors.email && <span className="field-error">{formErrors.email}</span>}
              </div>

              <div className="form-field">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editForm.isActive}
                    onChange={e => setEditForm({ ...editForm, isActive: e.target.checked })}
                  />
                  <span>Account Active</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="modal-btn modal-btn-primary">Save Changes</button>
                <button type="button" className="modal-btn modal-btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
