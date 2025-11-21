import React from 'react';
import { Link } from 'react-router-dom';
import './TestPrepPage.css';

const IELTSPage = () => {
  const courseFeatures = [
    {
      icon: '📚',
      title: 'Comprehensive Study Material',
      description: 'Access to latest IELTS preparation books, practice tests, and online resources'
    },
    {
      icon: '👨‍🏫',
      title: 'Expert Instructors',
      description: 'Learn from certified IELTS trainers with years of teaching experience'
    },
    {
      icon: '🎯',
      title: 'Personalized Training',
      description: 'Customized study plans based on your current level and target score'
    },
    {
      icon: '📊',
      title: 'Regular Mock Tests',
      description: 'Weekly practice tests with detailed performance analysis and feedback'
    },
    {
      icon: '🗣️',
      title: 'Speaking Practice',
      description: 'One-on-one speaking sessions with native speakers and expert trainers'
    },
    {
      icon: '✍️',
      title: 'Writing Workshops',
      description: 'Intensive writing practice with task-specific strategies and corrections'
    }
  ];

  const testStructure = [
    {
      section: 'Listening',
      duration: '30 minutes',
      questions: '40 questions',
      description: 'Four recorded monologues and conversations'
    },
    {
      section: 'Reading',
      duration: '60 minutes',
      questions: '40 questions',
      description: 'Three long reading passages with tasks'
    },
    {
      section: 'Writing',
      duration: '60 minutes',
      questions: '2 tasks',
      description: 'Task 1: Describe visual information, Task 2: Essay writing'
    },
    {
      section: 'Speaking',
      duration: '11-14 minutes',
      questions: '3 parts',
      description: 'Face-to-face conversation with examiner'
    }
  ];

  const coursePlans = [
    {
      name: 'Basic Plan',
      duration: '4 weeks',
      price: '₹12,000',
      features: [
        'Basic study materials',
        'Group classes (3 times/week)',
        '2 mock tests',
        'Email support',
        'Basic writing corrections'
      ],
      popular: false
    },
    {
      name: 'Standard Plan',
      duration: '8 weeks',
      price: '₹15,000',
      features: [
        'Complete study materials',
        'Group classes (4 times/week)',
        '4 mock tests',
        'Speaking practice sessions',
        'Detailed writing corrections',
        'WhatsApp support'
      ],
      popular: true
    },
    {
      name: 'Premium Plan',
      duration: '12 weeks',
      price: '₹25,000',
      features: [
        'Premium study materials',
        'Small batch classes (5 times/week)',
        '8 mock tests',
        'One-on-one speaking sessions',
        'Personalized writing coaching',
        '24/7 support',
        'Score guarantee'
      ],
      popular: false
    }
  ];

  const tips = [
    {
      title: 'Start Early',
      description: 'Begin preparation at least 2-3 months before your test date'
    },
    {
      title: 'Practice Daily',
      description: 'Dedicate at least 2 hours daily for consistent improvement'
    },
    {
      title: 'Focus on Weak Areas',
      description: 'Identify and work intensively on your weakest sections'
    },
    {
      title: 'Time Management',
      description: 'Practice with time limits to improve your speed and accuracy'
    }
  ];

  return (
    <div className="test-prep-page">
      {/* Hero Section */}
      <section className="test-prep-hero">
        <div className="test-prep-hero-container">
          <div className="test-prep-hero-content">
            <div className="test-prep-breadcrumb">
              <Link to="/">Home</Link> / <Link to="/#test-prep">Test Preparation</Link> / <span>IELTS</span>
            </div>
            <h1 className="test-prep-hero-title">
              IELTS Preparation Course
              <span className="test-prep-highlight">International English Language Testing System</span>
            </h1>
            <p className="test-prep-hero-description">
              Master the IELTS exam with our comprehensive preparation program. Achieve your target band score 
              with expert guidance, personalized training, and proven strategies.
            </p>
            <div className="test-prep-hero-stats">
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">7.5+</span>
                <span className="stat-label">Average Band Score</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Students Trained</span>
              </div>
            </div>
            <div className="test-prep-hero-cta">
              <Link to="/consultation" className="btn-test-prep-primary">
                Book Free Demo Class
                <span className="btn-arrow">→</span>
              </Link>
              <button className="btn-test-prep-secondary">
                Download Syllabus
                <span className="btn-arrow">↓</span>
              </button>
            </div>
          </div>
          <div className="test-prep-hero-image">
            <img src="\ielts.jpg" alt="IELTS Preparation" />
          </div>
        </div>
      </section>

      {/* Test Structure Section */}
      <section className="test-structure-section">
        <div className="container">
          <div className="section-header">
            <h2>IELTS Test Structure</h2>
            <p>Understanding the format is key to success</p>
          </div>
          <div className="test-structure-grid">
            {testStructure.map((section, index) => (
              <div key={index} className="structure-card">
                <div className="structure-header">
                  <h3>{section.section}</h3>
                  <span className="duration-badge">{section.duration}</span>
                </div>
                <div className="structure-details">
                  <p className="questions-count">{section.questions}</p>
                  <p className="section-description">{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features Section */}
      <section className="course-features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our IELTS Course?</h2>
            <p>Comprehensive preparation with proven results</p>
          </div>
          <div className="features-grid">
            {courseFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Plans Section */}
      <section className="course-plans-section">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your IELTS Course Plan</h2>
            <p>Flexible options to suit your needs and timeline</p>
          </div>
          <div className="plans-grid">
            {coursePlans.map((plan, index) => (
              <div key={index} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">{plan.price}</div>
                  <div className="plan-duration">{plan.duration}</div>
                </div>
                <div className="plan-features">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="plan-feature">
                      <span className="check-icon">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="plan-cta-btn">
                  {plan.popular ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Tips Section */}
      <section className="success-tips-section">
        <div className="container">
          <div className="section-header">
            <h2>IELTS Success Tips</h2>
            <p>Expert advice to maximize your score</p>
          </div>
          <div className="tips-grid">
            {tips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-number">{index + 1}</div>
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-description">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default IELTSPage;
