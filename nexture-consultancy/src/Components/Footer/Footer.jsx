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
              <li>Sajha Entrance, Kathmandu</li>
              <li>Nepal</li>
              <li>Phone: +91 98765 43210</li>
              <li>Email: info@nextureeducation.com</li>
            </ul>
          </div>
          
          {/* Location Map */}
          <div className="footer-section footer-map">
            <h4>Our Location</h4>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.429975296945!2d85.3203238385411!3d27.704007625740367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190137b7aff5%3A0x3b10d30307ca3e78!2sSajha%20Entrance!5e0!3m2!1sen!2snp!4v1756969767565!5m2!1sen!2snp" 
                width="100%" 
                height="200" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Nexture Education Location"
              ></iframe>
            </div>
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
