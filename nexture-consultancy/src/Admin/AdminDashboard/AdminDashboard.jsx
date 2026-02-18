import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import base_url from '../../../config';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentConsultations, setRecentConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authAxios, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashboardRes, consultationsRes] = await Promise.all([
        authAxios.get(`${base_url}/api/admin/dashboard`),
        authAxios.get(`${base_url}/api/consultation?limit=5`).catch(() => null)
      ]);

      if (dashboardRes.data.success) {
        setStats(dashboardRes.data.data.stats);
        setRecentContacts(dashboardRes.data.data.recentActivity?.contacts || []);
      }

      if (consultationsRes?.data?.success) {
        setRecentConsultations(consultationsRes.data.data?.slice(0, 5) || []);
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
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

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    const map = {
      new: 'status-new',
      'in-progress': 'status-progress',
      resolved: 'status-resolved',
      closed: 'status-closed',
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      completed: 'status-completed',
      cancelled: 'status-cancelled',
      rescheduled: 'status-rescheduled',
      published: 'status-published',
      draft: 'status-draft'
    };
    return map[status] || 'status-default';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <span className="error-icon">!</span>
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-text">
          <h1>{getGreeting()}, {user?.username || 'Admin'}</h1>
          <p>Here's what's happening with your website today.</p>
        </div>
        <div className="header-date">
          <span className="date-display">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <Link to="/admin/contact" className="stat-card stat-contacts">
          <div className="stat-icon">
            <span>&#9993;</span>
          </div>
          <div className="stat-info">
            <h3>{stats?.contacts?.total || 0}</h3>
            <p>Total Contacts</p>
            <span className="stat-sub">{stats?.contacts?.new || 0} new</span>
          </div>
        </Link>

        <Link to="/admin/consultations" className="stat-card stat-consultations">
          <div className="stat-icon">
            <span>&#128197;</span>
          </div>
          <div className="stat-info">
            <h3>{stats?.consultations?.total || 0}</h3>
            <p>Consultations</p>
            <span className="stat-sub">{stats?.consultations?.pending || 0} pending</span>
          </div>
        </Link>

        <Link to="/admin/blog" className="stat-card stat-blogs">
          <div className="stat-icon">
            <span>&#9998;</span>
          </div>
          <div className="stat-info">
            <h3>{stats?.blogs?.total || 0}</h3>
            <p>Blog Posts</p>
            <span className="stat-sub">{stats?.blogs?.published || 0} published</span>
          </div>
        </Link>

        <Link to="/admin/team" className="stat-card stat-team">
          <div className="stat-icon">
            <span>&#128101;</span>
          </div>
          <div className="stat-info">
            <h3>{stats?.team?.total || 0}</h3>
            <p>Team Members</p>
            <span className="stat-sub">{stats?.team?.active || 0} active</span>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <button onClick={() => navigate('/admin/blog')} className="action-btn action-blog">
            <span className="action-icon">+</span>
            <span>New Blog Post</span>
          </button>
          <button onClick={() => navigate('/admin/team')} className="action-btn action-team">
            <span className="action-icon">+</span>
            <span>Add Team Member</span>
          </button>
          <button onClick={() => navigate('/admin/consultations')} className="action-btn action-consult">
            <span className="action-icon">&#128203;</span>
            <span>View Consultations</span>
          </button>
          <button onClick={() => navigate('/admin/contact')} className="action-btn action-contact">
            <span className="action-icon">&#9993;</span>
            <span>View Contacts</span>
          </button>
          <button onClick={() => navigate('/admin/homepage')} className="action-btn action-home">
            <span className="action-icon">&#9998;</span>
            <span>Edit Homepage</span>
          </button>
          <button onClick={() => navigate('/admin/popup-image')} className="action-btn action-popup">
            <span className="action-icon">&#128444;</span>
            <span>Popup Image</span>
          </button>
        </div>
      </div>

      {/* Content Grid - Recent Activity */}
      <div className="content-grid">
        {/* Recent Contacts */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Recent Contacts</h2>
            <Link to="/admin/contact" className="view-all-link">View All &rarr;</Link>
          </div>
          <div className="card-body">
            {recentContacts.length === 0 ? (
              <div className="empty-state">
                <p>No recent contacts</p>
              </div>
            ) : (
              <div className="activity-list">
                {recentContacts.map((contact) => (
                  <div key={contact._id} className="activity-item">
                    <div className="activity-avatar">
                      {(contact.firstName?.[0] || 'C').toUpperCase()}
                    </div>
                    <div className="activity-details">
                      <p className="activity-name">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <p className="activity-meta">{contact.email}</p>
                      <p className="activity-subject">{contact.subject}</p>
                    </div>
                    <div className="activity-right">
                      <span className={`activity-status ${getStatusClass(contact.status)}`}>
                        {contact.status || 'new'}
                      </span>
                      <span className="activity-date">{formatDate(contact.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Recent Consultations</h2>
            <Link to="/admin/consultations" className="view-all-link">View All &rarr;</Link>
          </div>
          <div className="card-body">
            {recentConsultations.length === 0 ? (
              <div className="empty-state">
                <p>No recent consultations</p>
              </div>
            ) : (
              <div className="activity-list">
                {recentConsultations.map((consultation) => (
                  <div key={consultation._id} className="activity-item">
                    <div className="activity-avatar consultation-avatar">
                      {(consultation.firstName?.[0] || 'C').toUpperCase()}
                    </div>
                    <div className="activity-details">
                      <p className="activity-name">
                        {consultation.firstName} {consultation.lastName}
                      </p>
                      <p className="activity-meta">
                        {consultation.consultationType?.replace(/-/g, ' ')}
                      </p>
                      <p className="activity-subject">
                        {formatDate(consultation.preferredDate)} &middot; {consultation.preferredTime}
                      </p>
                    </div>
                    <div className="activity-right">
                      <span className={`activity-status ${getStatusClass(consultation.status)}`}>
                        {consultation.status || 'pending'}
                      </span>
                      <span className="activity-date">{formatDate(consultation.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="system-overview">
        <h2 className="section-title">System Overview</h2>
        <div className="overview-grid">
          <div className="overview-item">
            <div className="overview-label">Services</div>
            <div className="overview-value">{stats?.services?.total || 0}</div>
            <div className="overview-sub">{stats?.services?.active || 0} active</div>
          </div>
          <div className="overview-item">
            <div className="overview-label">Admin Users</div>
            <div className="overview-value">{stats?.users?.total || 0}</div>
            <div className="overview-sub">{stats?.users?.active || 0} active</div>
          </div>
          <div className="overview-item">
            <div className="overview-label">Blog Posts</div>
            <div className="overview-value">{stats?.blogs?.total || 0}</div>
            <div className="overview-sub">{stats?.blogs?.published || 0} published</div>
          </div>
          <div className="overview-item">
            <div className="overview-label">Team Members</div>
            <div className="overview-value">{stats?.team?.total || 0}</div>
            <div className="overview-sub">{stats?.team?.active || 0} active</div>
          </div>
        </div>
      </div>
    </div>
  );
}
