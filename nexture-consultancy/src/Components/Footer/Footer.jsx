import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-brand">
            <h3>Nexture Education</h3>
            <p>
              Your trusted partner in international education. We help students achieve their dreams of studying abroad with personalized guidance and expert support.
            </p>
            <div className="footer-social">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Instagram</a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/study-abroad">Study Abroad</Link></li>
              <li><Link to="/preparation-classes">Test Prep</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="footer-contact">
              <li>123 Education Street</li>
              <li>City, State 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@nexture.edu</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            &copy; 2024 Nexture Education. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
