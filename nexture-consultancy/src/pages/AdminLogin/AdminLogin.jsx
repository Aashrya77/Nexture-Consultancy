import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await login(credentials.email, credentials.password);
      
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-logo">
              <div className="logo-icon">🎓</div>
              <h1>Nexture Education</h1>
            </div>
            <h2>Admin Portal</h2>
            <p>Sign in to access the administration panel</p>
          </div>

          {error && (
            <div className="admin-login-error">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  placeholder="Enter your admin email"
                  required
                  disabled={isLoading}
                />
                <span className="input-icon">📧</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>🔐</span>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>
              <a href="/" className="back-link">← Back to Website</a>
            </p>
            <div className="security-notice">
              <span>🔒</span>
              <small>This is a secure admin area. All activities are logged.</small>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-login-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
