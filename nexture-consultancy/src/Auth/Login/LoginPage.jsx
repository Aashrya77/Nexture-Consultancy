import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';
import base_url from '../../../config';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${base_url}/api/auth/login`, formData);
      
      if (response.data.success) {
        // Store user data and token in localStorage 
        const token = response.data.token;
        localStorage.setItem('token', token);

       localStorage.setItem('user', JSON.stringify(response.data));
        

        
        // Redirect to admin dashboard (only admin users can login)
        navigate('/admin');
      } else {
        console.error('Login failed:', response);
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="login-page">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className={`login-container ${isAnimated ? 'animated' : ''}`}>
        <div className="login-card">
          <div className="login-header">
            <Link to="/" className="login-logo">
              <div className="logo-icon">🎓</div>
              <h1>Nexture Education</h1>
            </Link>
            <h2 className="login-title">Admin Login</h2>
            <p className="login-subtitle">Sign in to access the admin dashboard</p>
          </div>

          {error && (
            <div className="login-error">
              <span className="login-error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="email" className="login-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="login-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password" className="login-label">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="login-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an admin account? 
              <Link to="/register" className="login-link"> Create admin account</Link>
            </p>
            <p>
              <Link to="/" className="login-link">← Back to Home</Link>
            </p>
            {/* <div className="social-login">
              <div className="divider">
                <span>Or continue with</span>
              </div>
              <div className="social-buttons">
                <button className="social-btn google" disabled>
                  <span className="social-icon">🔍</span>
                  Google
                </button>
                <button className="social-btn microsoft" disabled>
                  <span className="social-icon">Ⓜ️</span>
                  Microsoft
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
