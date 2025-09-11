import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import base_url from '../../../config';
import './AboutPage.css';

export default function AboutPage() {
  // Company data
  const stats = [
    { number: '10+', label: 'Years Experience', icon: '🏆' },
    { number: '2,500+', label: 'Students Guided', icon: '🎓' },
    { number: '150+', label: 'Partner Universities', icon: '🏛️' },
    { number: '25+', label: 'Countries', icon: '🌍' },
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from personalized counseling to comprehensive test preparation.',
      icon: '⭐'
    },
    {
      title: 'Integrity',
      description: 'We maintain the highest standards of honesty and transparency in all our interactions with students and partners.',
      icon: '🤝'
    },
    {
      title: 'Innovation',
      description: 'We continuously evolve our methods and embrace new technologies to provide the best learning experience.',
      icon: '💡'
    },
    {
      title: 'Support',
      description: 'We provide comprehensive support throughout the entire journey, from initial consultation to post-arrival assistance.',
      icon: '🛡️'
    }
  ];

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get(`${base_url}/api/team`);
      
      if (response.data.success) {
        setTeam(response.data.data);
      } else {
        setError('Failed to load team members');
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError('Unable to load team members');
    } finally {
      setLoading(false);
    }
  };

  const milestones = [
    { year: '2014', event: 'Founded Nexture Education with a vision to democratize international education' },
    { year: '2016', event: 'Reached 500+ successful student placements across 10 countries' },
    { year: '2018', event: 'Expanded to include comprehensive test preparation programs' },
    { year: '2020', event: 'Launched online learning platform during global pandemic' },
    { year: '2022', event: 'Achieved 2,000+ student milestone and 98% success rate' },
    { year: '2024', event: 'Celebrating 10 years of excellence with 2,500+ success stories' }
  ];

  return (
    <div className="about-page">

      {/* Story Section */}
      <section className="about-story">
        <div className="about-story-container">
          <div className="about-story-content">
            <div className="about-story-text">
              <h2 className="about-story-title">Our Story</h2>
              <p className="about-story-description">
                Nexture Education was born from a simple yet powerful belief: every student deserves the opportunity to pursue world-class education, regardless of their background or circumstances. Founded in 2014 by a team of education professionals who had witnessed firsthand the transformative power of international education, we set out to create a consultancy that would truly put students first.
              </p>
              <p className="about-story-description">
                What started as a small team of passionate counselors has grown into a comprehensive education consultancy that serves students across the globe. We've maintained our core values of integrity, excellence, and personalized attention while expanding our services to meet the evolving needs of today's students.
              </p>
              <div className="about-story-highlights">
                <div className="about-story-highlight">
                  <span className="about-story-highlight-icon">🎯</span>
                  <div>
                    <h4>Personalized Approach</h4>
                    <p>Every student receives tailored guidance based on their unique goals and circumstances.</p>
                  </div>
                </div>
                <div className="about-story-highlight">
                  <span className="about-story-highlight-icon">🌍</span>
                  <div>
                    <h4>Global Network</h4>
                    <p>Strong partnerships with universities and institutions across 25+ countries worldwide.</p>
                  </div>
                </div>
                <div className="about-story-highlight">
                  <span className="about-story-highlight-icon">📈</span>
                  <div>
                    <h4>Proven Results</h4>
                    <p>98% success rate with over 2,500 students successfully placed in top universities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="about-values-container">
          <div className="about-values-header">
            <h2 className="about-values-title">Our Core Values</h2>
            <p className="about-values-subtitle">
              These principles guide everything we do and shape the way we serve our students
            </p>
          </div>
          <div className="about-values-grid">
            {values.map((value, index) => (
              <div key={index} className="about-value-card">
                <div className="about-value-icon">{value.icon}</div>
                <h3 className="about-value-title">{value.title}</h3>
                <p className="about-value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="about-team-container">
          <div className="about-team-header">
            <h2 className="about-team-title">Meet Our Expert Team</h2>
            <p className="about-team-subtitle">
              Our experienced professionals are dedicated to helping you achieve your educational goals
            </p>
          </div>
          <div className="about-team-grid">
            {loading ? (
              <div className="team-loading">
                <div className="loading-spinner"></div>
                <p>Loading our team...</p>
              </div>
            ) : error ? (
              <div className="team-error">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
                <button onClick={fetchTeamMembers} className="retry-btn">
                  Try Again
                </button>
              </div>
            ) : team.length > 0 ? (
              team.map((member) => (
                <div key={member._id} className="about-team-card">
                  <div className="about-team-avatar">
                    {member.image || member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="about-team-info">
                    <h3 className="about-team-name">{member.name}</h3>
                    <p className="about-team-role">{member.role}</p>
                    {member.experience && member.specialization && (
                      <p className="about-team-experience">{member.experience} • {member.specialization}</p>
                    )}
                    {member.bio && (
                      <p className="about-team-bio">{member.bio}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="team-empty">
                <span className="empty-icon">👥</span>
                <p>No team members available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-timeline">
        <div className="about-timeline-container">
          <div className="about-timeline-header">
            <h2 className="about-timeline-title">Our Journey</h2>
            <p className="about-timeline-subtitle">
              Key milestones in our mission to transform international education
            </p>
          </div>
          <div className="about-timeline-content">
            {milestones.map((milestone, index) => (
              <div key={index} className="about-timeline-item">
                <div className="about-timeline-year">{milestone.year}</div>
                <div className="about-timeline-event">{milestone.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta-container">
          <div className="about-cta-content">
            <h2 className="about-cta-title">Ready to Start Your Journey?</h2>
            <p className="about-cta-subtitle">
              Join thousands of successful students who have achieved their dreams with our expert guidance. 
              Let's make your international education goals a reality.
            </p>
            <div className="about-cta-actions">
              <Link to="/consultation" className="about-cta-button about-cta-primary">
                📞 Book Free Consultation
              </Link>
              <Link to="/contact" className="about-cta-button about-cta-secondary">
                💬 Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
