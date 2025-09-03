import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('/api/auth/register', formData);
      if (response.success) {
        setSuccess('Admin account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please check your details and try again.');
    }
    setIsLoading(false);
  }



  return (
    <div className="register-page">
      <div className="register-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
      
      <div className={`register-container ${isAnimated ? 'animated' : ''}`}>
        <div className="register-card">
          <div className="register-header">
            <Link to="/" className="register-logo">
              <div className="logo-icon">🎓</div>
              <h1>Nexture Education</h1>
            </Link>
            <h2 className="register-title">Create Admin Account</h2>
            <p className="register-subtitle">Register as an administrator to manage the platform</p>
          </div>

          {error && (
            <div className="register-error">
              <span className="register-error-icon">⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div className="register-success">
              <span className="register-success-icon">✅</span>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-form-row">
              <div className="register-field">
                <label htmlFor="firstName" className="register-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="register-input"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className="register-field">
                <label htmlFor="lastName" className="register-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="register-input"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="email" className="register-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="register-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="register-field">
              <label htmlFor="phone" className="register-label">Phone Number (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="register-input"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="register-form-row">
              <div className="register-field">
                <label htmlFor="password" className="register-label">Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="register-input"
                    placeholder="Create a password"
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
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className={`strength-fill strength-${passwordStrength}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`strength-text strength-${passwordStrength}`}>
                      {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                )}
              </div>

              <div className="register-field">
                <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="register-input"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <div className="password-mismatch">
                    ⚠️ Passwords do not match
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="register-button"
            >
              {isLoading ? (
                <>
                  <span className="register-spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account? 
              <Link to="/login" className="register-link"> Sign in here</Link>
            </p>
            <p>
              <Link to="/" className="register-link">← Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
