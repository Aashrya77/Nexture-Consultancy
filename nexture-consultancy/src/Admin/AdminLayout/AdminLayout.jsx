import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '🏠' },
    { name: 'Homepage Content', href: '/admin/homepage', icon: '🏡' },
    { name: 'Blog Posts', href: '/admin/blog', icon: '📝' },
    { name: 'Team Members', href: '/admin/team', icon: '👥' },
    { name: 'Consultations', href: '/admin/consultations', icon: '📅' },
    { name: 'Contact Info', href: '/admin/contact', icon: '📞' },
    { name: 'Site Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const NavItem = ({ item }) => (
    <Link
      key={item.name}
      to={item.href}
      className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
    >
      <span className="nav-icon">
        {item.icon}
      </span>
      {item.name}
    </Link>
  );

  return (
      <div className="admin-layout">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="mobile-overlay">
          <div className="mobile-overlay-bg" onClick={() => setSidebarOpen(false)} />
          <div className="mobile-sidebar">
            <div className="mobile-close-btn">
              <button
                type="button"
                className="mobile-close-btn"
                onClick={() => setSidebarOpen(false)}
              >
                <span>✕</span>
              </button>
            </div>
            <div className="mobile-sidebar-content">
              <div className="mobile-sidebar-header">
                <h2 className="mobile-sidebar-title">Nexture Admin</h2>
              </div>
              <nav className="mobile-nav">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="desktop-sidebar">
        <div className="sidebar-container">
          <div className="sidebar-content">
            <div className="sidebar-header">
              <h2 className="sidebar-title">Nexture Admin</h2>
            </div>
            <nav className="sidebar-nav">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>
          </div>
          <div className="user-info-section">
            <div className="user-info-container">
              <div className="user-info-content">
                <div className="user-details">
                  <div className="user-avatar">
                    A
                  </div>
                  <div className="user-text">
                    <p className="user-name">Admin User</p>
                    <p className="user-status">Logged in</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  title="Logout"
                >
                  <span className="logout-icon">🚪</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Mobile header */}
        <div className="mobile-header">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="mobile-menu-icon">☰</span>
          </button>
        </div>

        {/* Page content */}
        <main className="page-content">
          <div className="content-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
