import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ContactPage.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    subject: '',
    serviceType: 'general-inquiry',
    urgency: 'medium',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email Us',
      details: ['info@nextureeducation.com', 'support@nextureeducation.com'],
      description: 'Send us an email anytime and we\'ll get back to you within 24 hours.'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Speak directly with our counselors during business hours.'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['123 Education Street', 'Learning City, LC 12345'],
      description: 'Come visit our office for in-person consultation and guidance.'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: ['Available 24/7', 'Instant Support'],
      description: 'Get immediate answers to your questions through our live chat.'
    }
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: '12:00 PM - 4:00 PM' }
  ];

  const socialLinks = [
    { platform: 'Facebook', icon: '📘', url: '#' },
    { platform: 'Instagram', icon: '📷', url: '#' },
    { platform: 'LinkedIn', icon: '💼', url: '#' },
    { platform: 'YouTube', icon: '📺', url: '#' },
    { platform: 'WhatsApp', icon: '💚', url: '#' }
  ];

  const faqItems = [
    {
      question: 'How long does the consultation process take?',
      answer: 'Our initial consultation typically takes 45-60 minutes, during which we assess your profile and discuss your goals.'
    },
    {
      question: 'Do you charge for the first consultation?',
      answer: 'No, your first consultation is completely free. We believe in providing value before asking for commitment.'
    },
    {
      question: 'What documents should I bring for consultation?',
      answer: 'Please bring your academic transcripts, test scores (if any), passport, and any relevant work experience certificates.'
    },
    {
      question: 'Do you provide services for all countries?',
      answer: 'We specialize in 25+ countries including USA, Canada, UK, Australia, Germany, and many more popular destinations.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await contactAPI.submitContact(formData);
      
      if (response.success) {
        setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          subject: '',
          serviceType: 'general-inquiry',
          urgency: 'medium',
          message: ''
        });
      } else {
        setSubmitMessage('There was an error submitting your message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      


      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="contact-methods-container">
          <div className="contact-methods-header">
            <h2 className="contact-methods-title">Multiple Ways to Reach Us</h2>
            <p className="contact-methods-subtitle">
              Choose the communication method that works best for you
            </p>
          </div>
          <div className="contact-methods-grid">
            {contactInfo.map((method, index) => (
              <div key={index} className="contact-method-card">
                <div className="contact-method-icon">{method.icon}</div>
                <h3 className="contact-method-title">{method.title}</h3>
                <div className="contact-method-details">
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="contact-method-detail">{detail}</p>
                  ))}
                </div>
                <p className="contact-method-description">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-form-section">
        <div className="contact-form-container">
          <div className="contact-form-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <div className="contact-form-header">
                <h2 className="contact-form-title">Send Us a Message</h2>
                <p className="contact-form-subtitle">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              
              {submitMessage && (
                <div className="contact-success-message">
                  ✅ {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="name" className="contact-form-label">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="contact-form-input"
                      required
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="email" className="contact-form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="contact-form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="phone" className="contact-form-label">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="contact-form-input"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="interestedIn" className="contact-form-label">Interested In</label>
                    <select
                      id="interestedIn"
                      name="interestedIn"
                      value={formData.interestedIn}
                      onChange={handleInputChange}
                      className="contact-form-select"
                    >
                      <option value="">Select a service</option>
                      <option value="study-abroad">Study Abroad Counseling</option>
                      <option value="test-prep">Test Preparation</option>
                      <option value="visa-assistance">Visa Assistance</option>
                      <option value="scholarship">Scholarship Guidance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="contact-form-field">
                  <label htmlFor="subject" className="contact-form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="contact-form-input"
                    placeholder="Brief description of your inquiry"
                  />
                </div>
                
                <div className="contact-form-field">
                  <label htmlFor="message" className="contact-form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="contact-form-textarea"
                    placeholder="Please provide details about your inquiry, goals, and any specific questions you have..."
                    required
                  ></textarea>
                </div>
                
                <div className="contact-form-field">
                  <label className="contact-form-label">Preferred Contact Method</label>
                  <div className="contact-form-radio-group">
                    <label className="contact-form-radio">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                      />
                      <span>Email</span>
                    </label>
                    <label className="contact-form-radio">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                      />
                      <span>Phone</span>
                    </label>
                    <label className="contact-form-radio">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="whatsapp"
                        checked={formData.preferredContact === 'whatsapp'}
                        onChange={handleInputChange}
                      />
                      <span>WhatsApp</span>
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-form-submit"
                >
                  {isSubmitting ? '📤 Sending...' : '📧 Send Message'}
                </button>
              </form>
            </div>
            
            {/* Contact Info Sidebar */}
            <div className="contact-info-sidebar">
              {/* Office Hours */}
              <div className="contact-info-card">
                <h3 className="contact-info-title">🕒 Office Hours</h3>
                <div className="contact-office-hours">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="contact-office-hour">
                      <span className="contact-office-day">{schedule.day}</span>
                      <span className="contact-office-time">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="contact-info-note">
                  💡 Emergency support available 24/7 for urgent matters
                </p>
              </div>
              
              {/* Social Media */}
              <div className="contact-info-card">
                <h3 className="contact-info-title">🌐 Follow Us</h3>
                <div className="contact-social-links">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.url} className="contact-social-link">
                      <span className="contact-social-icon">{social.icon}</span>
                      <span className="contact-social-name">{social.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="contact-info-card">
                <h3 className="contact-info-title">⚡ Quick Actions</h3>
                <div className="contact-quick-actions">
                  <Link to="/consultation" className="contact-quick-action">
                    📅 Book Free Consultation
                  </Link>
                  <Link to="/preparation-classes" className="contact-quick-action">
                    📚 Explore Test Prep
                  </Link>
                  <Link to="/study-abroad" className="contact-quick-action">
                    🌍 Study Abroad Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="contact-faq-container">
          <div className="contact-faq-header">
            <h2 className="contact-faq-title">Frequently Asked Questions</h2>
            <p className="contact-faq-subtitle">
              Quick answers to common questions about our services
            </p>
          </div>
          <div className="contact-faq-grid">
            {faqItems.map((faq, index) => (
              <div key={index} className="contact-faq-item">
                <h3 className="contact-faq-question">{faq.question}</h3>
                <p className="contact-faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

