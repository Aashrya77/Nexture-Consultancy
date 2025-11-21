import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Our Commitment to Privacy',
      content: 'We respect your privacy and are committed to protecting your personal information.'
    },
    {
      title: 'Information We Collect',
      content: 'We collect the following information: Name, email, phone number, academic documents, and website usage data.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use your information to provide consultancy services, process applications, communicate updates, and improve our services.'
    },
    {
      title: 'Sharing Your Information',
      content: 'We do not sell personal information; it is shared only with universities, exam boards, or institutions necessary for providing services.'
    },
    {
      title: 'Cookies & Tracking',
      content: 'Cookies may be used to improve user experience; you can disable them in your browser.'
    },
    {
      title: 'Data Security',
      content: 'We implement reasonable measures to protect your information, though no system is completely secure.'
    },
    {
      title: 'Your Rights',
      content: 'You may request access, correction, or deletion of your personal data and unsubscribe from marketing communications anytime.'
    },
    {
      title: 'Changes to This Policy',
      content: 'Updates will be posted on this page.'
    }
  ];

  return (
    <div className="privacy-page">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="privacy-hero-container">
          <h1 className="privacy-hero-title">Privacy Policy</h1>
          <p className="privacy-hero-subtitle">
            Your privacy is important to us. Learn how we collect, use, and protect your information
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="privacy-content">
        <div className="privacy-container">
          <div className="privacy-intro">
            <p>
              Nexture Education ("we," "us," "our," or "Company") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website and use our services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with our policies and practices, 
              please do not use our services.
            </p>
          </div>

          <div className="privacy-sections">
            {sections.map((section, index) => (
              <div key={index} className="privacy-section">
                <h2 className="privacy-section-title">{index + 1}. {section.title}</h2>
                <p className="privacy-section-content">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="privacy-footer">
            <h3>Contact Us</h3>
            <p>
              If you have questions or concerns about this Privacy Policy or our privacy practices, 
              please contact us at:
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

export default PrivacyPolicy;
