import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = null; // assuming user is null for now, you should replace this with actual user data
  const handleLogout = () => {
    // implement logout logic here
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className='header-bar'>
        <div className="header-bar-content">
        <div className="contact-info">
          <div className="contact-item">
            
            <span>+91 98765 43210</span>
          </div>
          <div className="contact-item">
            
            <span>info@nextureeducation.com</span>
          </div>
          <div className="contact-item">
            
            <span>Kathmandu, Nepal</span>
          </div>
        </div>
        <div className="tagline">
          Your next step to a bright future
        </div>
      </div>
      </div>
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="header-logo">
            Nexture Education
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="header-nav">
            <Link to="/" className="header-nav-link">
              Home
            </Link>
            <Link to="/about" className="header-nav-link">
              About
            </Link>
            <Link to="/study-abroad" className="header-nav-link">
              Study Abroad
            </Link>
            <Link to="/preparation-classes" className="header-nav-link">
              Test Prep
            </Link>
            <Link to="/blog" className="header-nav-link">
              Blog
            </Link>
            <Link to="/contact" className="header-nav-link">
              Contact
            </Link>
          </nav>
          
          {/* Desktop CTA */}
          <div className="header-cta">
            {user && (
              <div className="header-user-menu">
                <span className="header-user-greeting">
                  👋 Hi, {user.firstName || user.name}
                </span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="btn-secondary">
                    Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="btn-outline">
                  Logout
                </button>
              </div>
            ) 

            }
            <div className='header-cta-buttons'>
              <button className="cta-btn">
                Book Consultation
              </button>
              </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="header-mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="header-mobile-nav">
            <div className="header-mobile-nav-content">
              <Link to="/" className="header-mobile-nav-link">
                Home
              </Link>
              <Link to="/about" className="header-mobile-nav-link">
                About
              </Link>
              <Link to="/study-abroad" className="header-mobile-nav-link">
                Study Abroad
              </Link>
              <Link to="/preparation-classes" className="header-mobile-nav-link">
                Test Prep
              </Link>
              <Link to="/blog" className="header-mobile-nav-link">
                Blog
              </Link>
              <Link to="/contact" className="header-mobile-nav-link">
                Contact
              </Link>
              {user ? (
                <div className="header-mobile-user-menu">
                  <span className="header-mobile-user-greeting">
                    👋 Hi, {user.firstName || user.name}
                  </span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="btn-secondary">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn-outline">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="header-mobile-auth-buttons">
                  <Link to="/login" className="btn-outline">
                    Login
                  </Link>
                  <Link to="/register" className="btn-secondary">
                    Register
                  </Link>
                  <Link to="/consultation" className="btn-primary">
                    Book Consultation
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
