import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing or using Nexture Education\'s website and services, you agree to provide accurate information, use our services lawfully, follow our guidelines, and accept our fees and policies.'
    },
    {
      title: 'Services Provided',
      content: 'Nexture Education provides educational consultancy services, including counseling, admission guidance, visa support, test preparation guidance, and documentation assistance.'
    },
    {
      title: 'Intellectual Property Rights',
      content: 'All content on the website, including text, images, and logos, is owned by Nexture Education and cannot be used without permission.'
    },
    {
      title: 'Payment and Refunds',
      content: 'Payments for services must be made as communicated; refunds are processed according to our refund policy.'
    },
    {
      title: 'Limitation of Liability',
      content: 'Nexture Education is not liable for delays or issues caused by third-party institutions or for any loss arising from the use of our services or advice.'
    },
    {
      title: 'Changes to Terms',
      content: 'We may update these terms at any time; users will be notified of significant changes.'
    },
    {
      title: 'Governing Law',
      content: 'These terms are governed by the laws of Nepal, and any disputes will be resolved in Nepali courts.'
    }
  ];

  return (
    <div className="terms-page">
      {/* Hero Section */}
      <section className="terms-hero">
        <div className="terms-hero-container">
          <h1 className="terms-hero-title">Terms of Service</h1>
          <p className="terms-hero-subtitle">
            Please read these terms carefully before using Nexture Education's services
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="terms-content">
        <div className="terms-container">
          <div className="terms-intro">
            <p>
              Welcome to Nexture Education. These Terms of Service ("Terms") govern your use of our website and services. 
              By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
            </p>
            <p>
              If you do not agree with any part of these Terms, please do not use our services.
            </p>
          </div>

          <div className="terms-sections">
            {sections.map((section, index) => (
              <div key={index} className="terms-section">
                <h2 className="terms-section-title">{index + 1}. {section.title}</h2>
                <p className="terms-section-content">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="terms-footer">
            <h3>Contact Information</h3>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <ul className="contact-list">
              <li><strong>Email:</strong> Nextureeducation@gmail.com</li>
              <li><strong>Phone:</strong> +977 01-5928212</li>
            </ul>
            <p className="last-updated">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
