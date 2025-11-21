import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import base_url from '../../../config';
import './ConsultationPage.css';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    alternateDate: '',
    preferredTime: 'morning',
    consultationType: 'study-abroad',
    countryOfInterest: '',
    academicLevel: 'bachelors',
    consultationMode: 'video-call',
    message: ''
  });
  
  // For animation effects
  const [isVisible, setIsVisible] = useState(false);
  
  // Set elements to visible after component mounts for animations
  React.useEffect(() => {
    setIsVisible(true);
    
    // Add scroll event listener for scroll animations
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-animate');
      
      scrollElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.85;
        
        if (isInViewport) {
          el.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [errors, setErrors] = useState({});

  // Get tomorrow's date for min date in date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

  // Get date 3 months from now for max date in date picker
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  const threeMonthsLaterFormatted = threeMonthsLater.toISOString().split('T')[0];

  const consultationTypes = [
    { value: 'study-abroad', label: 'Study Abroad Counseling' },
    { value: 'test-preparation', label: 'Test Preparation' },
    { value: 'visa-assistance', label: 'Visa Assistance' },
    { value: 'career-counseling', label: 'Career Counseling' },
    { value: 'scholarship', label: 'Scholarship Guidance' },
    { value: 'general-inquiry', label: 'General Inquiry' }
  ];

  const academicLevels = [
    { value: 'high-school', label: 'High School' },
    { value: 'bachelors', label: 'Bachelor\'s Degree' },
    { value: 'masters', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' },
    { value: 'other', label: 'Other' }
  ];

  const consultationModes = [
    { value: 'video-call', label: 'Video Call' },
    { value: 'phone-call', label: 'Phone Call' },
    { value: 'in-person', label: 'In-Person' }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning (9:00 AM - 12:00 PM)' },
    { value: 'afternoon', label: 'Afternoon (1:00 PM - 4:00 PM)' },
    { value: 'evening', label: 'Evening (5:00 PM - 7:00 PM)' }
  ];

  const countries = [
    { value: 'australia', label: 'Australia' },
    { value: 'canada', label: 'Canada' },
    { value: 'germany', label: 'Germany' },
    { value: 'new-zealand', label: 'New Zealand' },
    { value: 'united-kingdom', label: 'United Kingdom' },
    { value: 'united-states', label: 'United States' },
    { value: 'other', label: 'Other' }
  ];

  const benefits = [
    {
      icon: '🎯',
      title: 'Personalized Guidance',
      description: 'Get tailored advice specific to your academic background, career goals, and personal preferences.'
    },
    {
      icon: '🌍',
      title: 'Country Selection',
      description: 'Discover the best study destinations that align with your academic interests, budget, and career aspirations.'
    },
    {
      icon: '🏫',
      title: 'University Selection',
      description: 'Get expert recommendations on universities and programs that match your profile and maximize admission chances.'
    },
    {
      icon: '💰',
      title: 'Scholarship Guidance',
      description: 'Learn about scholarship opportunities and financial aid options to make your education more affordable.'
    },
    {
      icon: '📝',
      title: 'Application Strategy',
      description: 'Develop a strategic plan for applications, including timelines, document preparation, and submission tactics.'
    },
    {
      icon: '🛂',
      title: 'Visa Assistance',
      description: 'Understand visa requirements and get guidance on preparing a successful visa application.'
    }
  ];

  const testimonials = [
    {
      name: 'Bimal Lungeli Magar',
      program: 'Student in Australia',
      image: '/Bimal.jpg',
      title: 'Smooth and Stress-Free!',
      quote: 'From choosing my university to visa approval, the Nexture team was with me every step.'
    },   
    {
      name: 'Sandhya Dhakal',
      program: 'Student in Canada',
      image: '/sandhya.jpg',
      title: 'Truly Reliable!',
      quote: 'They made my dream of studying in Canada possible. Highly recommend their services!'
    }
  ];

  const faqItems = [
    {
      question: 'How long does the consultation session last?',
      answer: 'Our standard consultation sessions last for 45-60 minutes, giving you ample time to discuss your goals, ask questions, and receive personalized guidance.'
    },
    {
      question: 'What should I prepare before the consultation?',
      answer: 'To make the most of your session, please have your academic transcripts, standardized test scores (if any), resume/CV, and a list of questions or concerns you\'d like to address.'
    },
    {
      question: 'Is there a fee for the consultation?',
      answer: 'Your first consultation is completely free of charge. This allows you to experience our services and determine if we\'re the right fit for your needs before making any commitments.'
    },
    {
      question: 'Can I reschedule my consultation if needed?',
      answer: 'Yes, you can reschedule your consultation up to 24 hours before the scheduled time. Simply contact us via email or phone to arrange a new time slot.'
    },
    {
      question: 'Will I get a recording of my consultation session?',
      answer: 'Upon request, we can provide a recording of your virtual consultation session for your future reference.'
    },
    {
      question: 'What happens after the consultation?',
      answer: 'After your consultation, you\'ll receive a summary of the discussion, recommended next steps, and information about our comprehensive services that can help you achieve your study abroad goals.'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus('');
    
    try {
      const response = await axios.post(`${base_url}/api/consultation`, formData);
      
      if (response.data.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your consultation has been scheduled. We\'ll contact you shortly to confirm the details.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          preferredDate: '',
          alternateDate: '',
          preferredTime: 'morning',
          consultationType: 'study-abroad',
          countryOfInterest: '',
          academicLevel: 'bachelors',
          consultationMode: 'video-call',
          message: ''
        });
        
        // Scroll to top to show success message
        window.scrollTo({
          top: document.getElementById('booking-form').offsetTop - 100,
          behavior: 'smooth'
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage('There was an error scheduling your consultation. Please try again.');
      }
    } catch (error) {
      console.error('Consultation booking error:', error);
      setSubmitStatus('error');
      setSubmitMessage(error.response?.data?.message || 'There was an error scheduling your consultation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="consultation-page">
      {/* Hero Section */}
      <section className="consultation-hero">
        <div className="consultation-hero-container">
          <div className={`consultation-hero-content ${isVisible ? 'animate-in' : ''}`}>
            <div className="hero-badge">Expert Education Counseling</div>
            <h1 className="consultation-hero-title">
              Book Your Free Consultation
              <span className="hero-highlight">Start Your Journey</span>
            </h1>
            <p className="consultation-hero-subtitle">
              Take the first step towards your international education journey with our expert counselors
            </p>
            <div className="consultation-hero-features">
              <div className="consultation-hero-feature">
                <span className="consultation-feature-icon">✅</span>
                <span className="consultation-feature-text">Free 45-minute session</span>
              </div>
              <div className="consultation-hero-feature">
                <span className="consultation-feature-icon">✅</span>
                <span className="consultation-feature-text">Personalized guidance</span>
              </div>
              <div className="consultation-hero-feature">
                <span className="consultation-feature-icon">✅</span>
                <span className="consultation-feature-text">Expert counselors</span>
              </div>
              <div className="consultation-hero-feature">
                <span className="consultation-feature-icon">✅</span>
                <span className="consultation-feature-text">Flexible scheduling</span>
              </div>
            </div>
            <a href="#booking-form" className="consultation-hero-cta">
              Schedule Now
              <span className="btn-arrow">→</span>
            </a>
          </div>
          <div className={`consultation-hero-image ${isVisible ? 'animate-in' : ''}`}>
            <img 
              src="/consultation-hero.jpg" 
              alt="Student consultation" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "\consultation.jpg";
              }}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="consultation-benefits">
        <div className="consultation-benefits-container">
          <div className="consultation-benefits-header scroll-animate">
            <h2 className="consultation-benefits-title">Why Book a Consultation?</h2>
            <p className="consultation-benefits-subtitle">
              Our consultation sessions provide valuable insights and guidance to help you make informed decisions
            </p>
          </div>
          <div className="consultation-benefits-grid">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="consultation-benefit-card scroll-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="consultation-benefit-icon">{benefit.icon}</div>
                <h3 className="consultation-benefit-title">{benefit.title}</h3>
                <p className="consultation-benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="consultation-booking">
        <div className="consultation-booking-container">
          <div className="consultation-booking-grid">
            {/* Booking Form */}
            <div className="consultation-form-wrapper scroll-animate">
              <div className="consultation-form-header">
                <h2 className="consultation-form-title">Schedule Your Consultation</h2>
                <p className="consultation-form-subtitle">
                  Fill out the form below to book your free consultation session
                </p>
              </div>
              
              {submitMessage && (
                <div className={`consultation-message ${submitStatus}`}>
                  {submitStatus === 'success' ? '✅' : '❌'} {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="consultation-form">
                <div className="consultation-form-row">
                  <div className="consultation-form-field">
                    <label htmlFor="firstName" className="consultation-form-label">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`consultation-form-input ${errors.firstName ? 'error' : ''}`}
                    />
                    {errors.firstName && <span className="consultation-form-error">{errors.firstName}</span>}
                  </div>
                  <div className="consultation-form-field">
                    <label htmlFor="lastName" className="consultation-form-label">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`consultation-form-input ${errors.lastName ? 'error' : ''}`}
                    />
                    {errors.lastName && <span className="consultation-form-error">{errors.lastName}</span>}
                  </div>
                </div>
                
                <div className="consultation-form-row">
                  <div className="consultation-form-field">
                    <label htmlFor="email" className="consultation-form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`consultation-form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="consultation-form-error">{errors.email}</span>}
                  </div>
                  <div className="consultation-form-field">
                    <label htmlFor="phone" className="consultation-form-label">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`consultation-form-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="consultation-form-error">{errors.phone}</span>}
                  </div>
                </div>
                
                <div className="consultation-form-row">
                  <div className="consultation-form-field">
                    <label htmlFor="consultationType" className="consultation-form-label">Consultation Type *</label>
                    <select
                      id="consultationType"
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleInputChange}
                      className="consultation-form-select"
                    >
                      {consultationTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="consultation-form-field">
                    <label htmlFor="consultationMode" className="consultation-form-label">Consultation Mode *</label>
                    <select
                      id="consultationMode"
                      name="consultationMode"
                      value={formData.consultationMode}
                      onChange={handleInputChange}
                      className="consultation-form-select"
                    >
                      {consultationModes.map((mode) => (
                        <option key={mode.value} value={mode.value}>{mode.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="consultation-form-row">
                  <div className="consultation-form-field">
                    <label htmlFor="preferredDate" className="consultation-form-label">Preferred Date *</label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={tomorrowFormatted}
                      max={threeMonthsLaterFormatted}
                      className={`consultation-form-input ${errors.preferredDate ? 'error' : ''}`}
                    />
                    {errors.preferredDate && <span className="consultation-form-error">{errors.preferredDate}</span>}
                  </div>
                  <div className="consultation-form-field">
                    <label htmlFor="alternateDate" className="consultation-form-label">Alternate Date (Optional)</label>
                    <input
                      type="date"
                      id="alternateDate"
                      name="alternateDate"
                      value={formData.alternateDate}
                      onChange={handleInputChange}
                      min={tomorrowFormatted}
                      max={threeMonthsLaterFormatted}
                      className="consultation-form-input"
                    />
                  </div>
                </div>
                
                <div className="consultation-form-row">
                  <div className="consultation-form-field">
                    <label htmlFor="preferredTime" className="consultation-form-label">Preferred Time *</label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="consultation-form-select"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="consultation-form-field">
                    <label htmlFor="academicLevel" className="consultation-form-label">Academic Level *</label>
                    <select
                      id="academicLevel"
                      name="academicLevel"
                      value={formData.academicLevel}
                      onChange={handleInputChange}
                      className="consultation-form-select"
                    >
                      {academicLevels.map((level) => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="consultation-form-field">
                  <label htmlFor="countryOfInterest" className="consultation-form-label">Country of Interest</label>
                  <select
                    id="countryOfInterest"
                    name="countryOfInterest"
                    value={formData.countryOfInterest}
                    onChange={handleInputChange}
                    className="consultation-form-select"
                  >
                    <option value="">Select a country (optional)</option>
                    {countries.map((country) => (
                      <option key={country.value} value={country.value}>{country.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="consultation-form-field">
                  <label htmlFor="message" className="consultation-form-label">Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="consultation-form-textarea"
                    placeholder="Please share any specific questions or information that will help us prepare for your consultation..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="consultation-form-submit"
                >
                  {isSubmitting ? '📅 Scheduling...' : '📅 Schedule Consultation'}
                </button>
                
                <p className="consultation-form-note">
                  By scheduling a consultation, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
                </p>
              </form>
            </div>
            
            {/* Sidebar */}
            <div className="consultation-sidebar">
              {/* What to Expect */}
              <div className="consultation-sidebar-card scroll-animate">
                <h3 className="consultation-sidebar-title">What to Expect</h3>
                <ul className="consultation-expectation-list">
                  <li className="consultation-expectation-item">
                    <span className="consultation-expectation-icon">📋</span>
                    <span className="consultation-expectation-text">Assessment of your academic profile</span>
                  </li>
                  <li className="consultation-expectation-item">
                    <span className="consultation-expectation-icon">🎯</span>
                    <span className="consultation-expectation-text">Discussion of your goals and aspirations</span>
                  </li>
                  <li className="consultation-expectation-item">
                    <span className="consultation-expectation-icon">🌍</span>
                    <span className="consultation-expectation-text">Country and university recommendations</span>
                  </li>
                  <li className="consultation-expectation-item">
                    <span className="consultation-expectation-icon">📝</span>
                    <span className="consultation-expectation-text">Application strategy and timeline</span>
                  </li>
                  <li className="consultation-expectation-item">
                    <span className="consultation-expectation-icon">💰</span>
                    <span className="consultation-expectation-text">Scholarship and funding options</span>
                  </li>
                  <li className="consultation-expectation-item">
                    <span className="consultation-expectation-icon">❓</span>
                    <span className="consultation-expectation-text">Answers to your specific questions</span>
                  </li>
                </ul>
              </div>
              
              {/* Preparation Tips */}
              <div className="consultation-sidebar-card scroll-animate" style={{ animationDelay: '0.2s' }}>
                <h3 className="consultation-sidebar-title">How to Prepare</h3>
                <ul className="consultation-preparation-list">
                  <li className="consultation-preparation-item">
                    <span className="consultation-preparation-icon">📄</span>
                    <span className="consultation-preparation-text">Have your academic transcripts ready</span>
                  </li>
                  <li className="consultation-preparation-item">
                    <span className="consultation-preparation-icon">📊</span>
                    <span className="consultation-preparation-text">Prepare test scores (if available)</span>
                  </li>
                  <li className="consultation-preparation-item">
                    <span className="consultation-preparation-icon">📝</span>
                    <span className="consultation-preparation-text">List your questions and concerns</span>
                  </li>
                  <li className="consultation-preparation-item">
                    <span className="consultation-preparation-icon">🎯</span>
                    <span className="consultation-preparation-text">Think about your career goals</span>
                  </li>
                  <li className="consultation-preparation-item">
                    <span className="consultation-preparation-icon">💼</span>
                    <span className="consultation-preparation-text">Consider your budget constraints</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="consultation-testimonials">
        <div className="consultation-testimonials-container">
          <div className="consultation-testimonials-header scroll-animate">
            <h2 className="consultation-testimonials-title">What Our Students Say</h2>
            <p className="consultation-testimonials-subtitle">
              Hear from students who started their journey with a consultation
            </p>
          </div>
          <div className="consultation-testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="consultation-testimonial-card scroll-animate"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="consultation-testimonial-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="consultation-testimonial-content">
                  <h4 className="consultation-testimonial-title">{testimonial.title}</h4>
                  <p className="consultation-testimonial-quote">"{testimonial.quote}"</p>
                  <p className="consultation-testimonial-name">– {testimonial.name}</p>
                  <p className="consultation-testimonial-program">{testimonial.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="consultation-faq">
        <div className="consultation-faq-container">
          <div className="consultation-faq-header scroll-animate">
            <h2 className="consultation-faq-title">Frequently Asked Questions</h2>
            <p className="consultation-faq-subtitle">
              Find answers to common questions about our consultation sessions
            </p>
          </div>
          <div className="consultation-faq-grid">
            {faqItems.map((faq, index) => (
              <div 
                key={index} 
                className="consultation-faq-item scroll-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="consultation-faq-question">{faq.question}</h3>
                <p className="consultation-faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="consultation-cta">
        <div className="consultation-cta-container">
          <h2 className="consultation-cta-title scroll-animate">Ready to Start Your Journey?</h2>
          <p className="consultation-cta-text scroll-animate" style={{ animationDelay: '0.1s' }}>
            Book your free consultation today and take the first step towards your international education
          </p>
          <a href="#booking-form" className="consultation-cta-button scroll-animate" style={{ animationDelay: '0.2s' }}>
            Schedule Your Consultation
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
