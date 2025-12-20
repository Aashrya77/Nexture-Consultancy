import React from 'react';
import { Link } from 'react-router-dom';
import './TestPrepPage.css';

const PTEPage = () => {
  const courseFeatures = [
    {
      icon: '🖥️',
      title: 'Computer-Based Training',
      description: 'Practice on actual PTE software interface with real-time scoring'
    },
    {
      icon: '🎤',
      title: 'AI-Powered Speaking Practice',
      description: 'Advanced speech recognition technology for accurate pronunciation feedback'
    },
    {
      icon: '📈',
      title: 'Score Prediction',
      description: 'Real-time score prediction based on your practice performance'
    },
    {
      icon: '🔄',
      title: 'Integrated Skills Training',
      description: 'Master PTE\'s unique integrated tasks that test multiple skills simultaneously'
    },
    {
      icon: '⚡',
      title: 'Fast Results',
      description: 'Get your PTE scores within 48 hours of taking the test'
    },
    {
      icon: '🎯',
      title: 'Template-Based Approach',
      description: 'Learn proven templates and strategies for each question type'
    }
  ];

  const testStructure = [
    {
      section: 'Speaking & Writing',
      duration: '77-93 minutes',
      questions: '7 question types',
      description: 'Personal introduction, read aloud, repeat sentence, describe image, re-tell lecture, answer short questions, summarize written text, essay writing'
    },
    {
      section: 'Reading',
      duration: '32-41 minutes',
      questions: '5 question types',
      description: 'Multiple choice, re-order paragraphs, fill in the blanks, multiple choice (multiple answers), reading & writing fill in the blanks'
    },
    {
      section: 'Listening',
      duration: '45-57 minutes',
      questions: '8 question types',
      description: 'Summarize spoken text, multiple choice, fill the blanks, highlight correct summary, multiple choice (multiple answers), select missing word, highlight incorrect words, write from dictation'
    }
  ];

  const coursePlans = [
    {
      name: 'Express Plan',
      duration: '3 weeks',
      price: '₹7,000',
      features: [
        'PTE software access',
        'Intensive group classes (4 times/week)',
        '3 scored practice tests',
        'Template training',
        'Basic strategy sessions'
      ],
      popular: false
    },
    {
      name: 'Standard Plan',
      duration: '6 weeks',
      price: '₹9,000',
      features: [
        'Full PTE software suite',
        'Small batch classes (5 times/week)',
        '6 scored practice tests',
        'Advanced templates & strategies',
        'Speaking & pronunciation coaching',
        'Writing correction sessions',
        'WhatsApp support'
      ],
      popular: true
    },
    {
      name: 'Premium Plan',
      duration: '10 weeks',
      price: '₹12,000',
      features: [
        'Unlimited software access',
        'One-on-one coaching sessions',
        '10 scored practice tests',
        'Personalized study plan',
        'AI-powered feedback system',
        'Mock test analysis',
        '24/7 expert support',
        'Score guarantee (65+ overall)'
      ],
      popular: false
    }
  ];

  const pteAdvantages = [
    {
      title: 'Faster Results',
      description: 'Get your scores within 48 hours',
      icon: '⚡'
    },
    {
      title: 'Computer-Based',
      description: 'No human bias, completely automated scoring',
      icon: '🖥️'
    },
    {
      title: 'Flexible Scheduling',
      description: 'Available throughout the year with frequent test dates',
      icon: '📅'
    },
    {
      title: 'Widely Accepted',
      description: 'Accepted by universities in Australia, UK, USA, Canada, and New Zealand',
      icon: '🌍'
    }
  ];

  const scoringGuide = [
    { score: '90', level: 'Superior', description: 'Highly proficient user' },
    { score: '76-89', level: 'Proficient', description: 'Very good user' },
    { score: '59-75', level: 'Competent', description: 'Good user' },
    { score: '43-58', level: 'Modest', description: 'Modest user' },
    { score: '30-42', level: 'Limited', description: 'Limited user' },
    { score: '10-29', level: 'Extremely Limited', description: 'Extremely limited user' }
  ];

  return (
    <div className="test-prep-page">
      {/* Hero Section */}
      <section className="test-prep-hero">
        <div className="test-prep-hero-container">
          <div className="test-prep-hero-content">
            <div className="test-prep-breadcrumb">
              <Link to="/">Home</Link> / <Link to="/#test-prep">Test Preparation</Link> / <span>PTE</span>
            </div>
            <h1 className="test-prep-hero-title">
              PTE Academic Preparation
              <span className="test-prep-highlight">Pearson Test of English</span>
            </h1>
            <p className="test-prep-hero-description">
              Excel in PTE Academic with our specialized computer-based training program. Master the unique 
              format and achieve your target score with AI-powered practice and expert guidance.
            </p>
            <div className="test-prep-hero-stats">
              <div className="stat-item">
                <span className="stat-number">92%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">72+</span>
                <span className="stat-label">Average Score</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">48hrs</span>
                <span className="stat-label">Fast Results</span>
              </div>
            </div>
            <div className="test-prep-hero-cta">
              <Link to="/consultation" className="btn-test-prep-primary">
                Book Free Demo Class
                <span className="btn-arrow">→</span>
              </Link>
              <button className="btn-test-prep-secondary">
                Download PTE Guide
                <span className="btn-arrow">↓</span>
              </button>
            </div>
          </div>
          <div className="test-prep-hero-image">
            <img src="\pte.png" alt="PTE Academic Preparation" />
          </div>
        </div>
      </section>

      {/* PTE Advantages Section */}
      <section className="pte-advantages-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose PTE Academic?</h2>
            <p>Modern, efficient, and globally recognized</p>
          </div>
          <div className="advantages-grid">
            {pteAdvantages.map((advantage, index) => (
              <div key={index} className="advantage-card">
                <div className="advantage-icon">{advantage.icon}</div>
                <h3 className="advantage-title">{advantage.title}</h3>
                <p className="advantage-description">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Structure Section */}
      <section className="test-structure-section">
        <div className="container">
          <div className="section-header">
            <h2>PTE Academic Test Format</h2>
            <p>Understanding the integrated skills approach</p>
          </div>
          <div className="test-structure-grid pte-structure">
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

      {/* Scoring Guide Section */}
      <section className="scoring-guide-section">
        <div className="container">
          <div className="section-header">
            <h2>PTE Academic Scoring Guide</h2>
            <p>Understand the scoring system and set your target</p>
          </div>
          <div className="scoring-table">
            {scoringGuide.map((score, index) => (
              <div key={index} className="score-row">
                <div className="score-range">{score.score}</div>
                <div className="score-level">{score.level}</div>
                <div className="score-description">{score.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Features Section */}
      <section className="course-features-section">
        <div className="container">
          <div className="section-header">
            <h2>Our PTE Preparation Features</h2>
            <p>Technology-driven approach for maximum results</p>
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
            <h2>Choose Your PTE Course Plan</h2>
            <p>Flexible options designed for different timelines and goals</p>
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

      {/* PTE Tips Section */}
      <section className="success-tips-section">
        <div className="container">
          <div className="section-header">
            <h2>PTE Success Strategies</h2>
            <p>Expert tips to maximize your PTE score</p>
          </div>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-number">1</div>
              <h3 className="tip-title">Master Templates</h3>
              <p className="tip-description">Learn and practice proven templates for speaking and writing tasks</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">2</div>
              <h3 className="tip-title">Practice Typing Speed</h3>
              <p className="tip-description">Improve your typing speed to at least 40 WPM for better performance</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">3</div>
              <h3 className="tip-title">Focus on Pronunciation</h3>
              <p className="tip-description">Clear pronunciation is crucial for speaking tasks scoring</p>
            </div>
            <div className="tip-card">
              <div className="tip-number">4</div>
              <h3 className="tip-title">Time Management</h3>
              <p className="tip-description">Practice with strict time limits to improve speed and accuracy</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PTEPage;
