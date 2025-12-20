import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTiktok, FaChevronDown } from 'react-icons/fa';
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = null; // assuming user is null for now, you should replace this with actual user data
  const handleLogout = () => {
    // implement logout logic here
  };

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const countries = [
    { name: 'Australia', flag: '🇦🇺', slug: 'australia' },
    { name: 'USA', flag: '🇺🇸', slug: 'united-states' },
    { name: 'New Zealand', flag: '🇳🇿', slug: 'new-zealand' },
    { name: 'UK', flag: '🇬🇧', slug: 'united-kingdom' },
    { name: 'Germany', flag: '🇩🇪', slug: 'germany' },
    { name: 'Canada', flag: '🇨🇦', slug: 'canada' },
  ];

  return (
    <header className="header">
      <div className='header-bar'>
        <div className="header-bar-content">
        <div className="contact-info">
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <span>+977 01-5928212</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <span>nextureeducation@gmail.com</span>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>Kathmandu, Nepal</span>
          </div>
        </div>
        <div className="header-bar-links">
          <Link to="/counselor-dashboard" style={{color: 'white', textDecoration: 'underline'}} className="">
            Counselor Dashboard
          </Link>
        </div>
        <div className="socials">
          <Link to={"https://www.tiktok.com/@nextureeducation"}><FaTiktok /></Link>
          <Link to={"https://www.instagram.com/nexture.education/"}><FaInstagram /></Link>
          <Link to={"https://www.facebook.com/profile.php?id=61577074226283"}><FaFacebook /></Link>
        </div>
      </div>
      </div>
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="header-logo">
            <img src="/logo.jpeg" width={300} height={200} alt="Nexture Education" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="header-nav">
            <Link to="/" className="header-nav-link" onClick={() => toggleMobileMenu()}>
              Home
            </Link>
            <Link to="/about" className="header-nav-link" onClick={() => toggleMobileMenu()}>
              About
            </Link>
            <div 
              className="header-nav-item-dropdown"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link to="/study-abroad" className="header-nav-link">
                Study Abroad
                <FaChevronDown className={`dropdown-icon ${isDropdownOpen ? 'active' : ''}`} />
              </Link>
              {isDropdownOpen && (
                <div className="header-dropdown-menu">
                  {countries.map((country) => (
                    <Link
                      key={country.slug}
                      to={`/study/${country.slug}`}
                      className="header-dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span className="country-flag">{country.flag}</span>
                      <span className="country-name">{country.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* <Link to="/preparation-classes" className="header-nav-link">
              Test Prep
            </Link> */}
            <Link to="/blog" className="header-nav-link" onClick={() => toggleMobileMenu()}>
              Blog
            </Link>
            <Link to="/contact" className="header-nav-link" onClick={() => toggleMobileMenu()}>
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
              <button className="cta-btn" onClick={() => { navigate('/consultation'); toggleMobileMenu(); }}>
                Book Consultation
              </button>
              </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`header-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="hamburger-icon">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`header-mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="header-mobile-nav-overlay" onClick={toggleMobileMenu}></div>
          <div className="header-mobile-nav-content">
              <Link to="/" className="header-mobile-nav-link" onClick={toggleMobileMenu}>
                Home
              </Link>
              <Link to="/about" className="header-mobile-nav-link" onClick={toggleMobileMenu}>
                About
              </Link>
              <Link to="/study-abroad" className="header-mobile-nav-link" onClick={toggleMobileMenu}>
                Study Abroad
              </Link>
              {/* <Link to="/preparation-classes" className="header-mobile-nav-link" onClick={toggleMobileMenu}>
                Test Prep
              </Link> */}
              <Link to="/blog" className="header-mobile-nav-link" onClick={toggleMobileMenu}>
                Blog
              </Link>
              <Link to="/contact" className="header-mobile-nav-link" onClick={toggleMobileMenu}>
                Contact
              </Link>
              <Link to="/counselor-dashboard" className="header-mobile-nav-link" onClick={toggleMobileMenu}>
                Counselor Dashboard
              </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
