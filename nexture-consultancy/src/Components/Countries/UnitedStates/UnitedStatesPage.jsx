import React from 'react';
import './UnitedStatesPage.css';

const UnitedStatesPage = () => {
  return (
    <div className="study-usa-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="clouds-decoration">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Study in<br />
            <span className="usa-text">United States</span>
          </h1>
        </div>
        
        <div className="skyline">
          <div className="building building-1"></div>
          <div className="building building-2"></div>
          <div className="building building-3"></div>
          <div className="building building-4"></div>
          <div className="building building-5"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="about-title">
            Experience American Excellence in Education
          </h2>
          <p className="about-description">
            The United States hosts the world's most prestigious universities and offers unparalleled academic diversity. 
            With cutting-edge research facilities, innovative teaching methods, and a culture of entrepreneurship, 
            American higher education provides students with opportunities to learn from world-renowned faculty and 
            engage with the latest advancements in every field of study.
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="reasons-section">
        <div className="container">
          <div className="reasons-header">
            <h2 className="reasons-title">
              Reasons for<br />
              studying in <span className="highlight">United States</span>
            </h2>
          </div>
          
          <div className="reasons-grid">
            <div className="reason-card">
              <h3 className="reason-title">World's Top Universities</h3>
              <p className="reason-description">
                Home to 8 of the world's top 10 universities including Harvard, MIT, Stanford, and Yale, 
                offering unmatched academic prestige and global recognition.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Research & Innovation Hub</h3>
              <p className="reason-description">
                Access to cutting-edge research facilities and opportunities to work with Nobel laureates 
                and industry leaders in technology, medicine, and science.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Diverse Academic Programs</h3>
              <p className="reason-description">
                Choose from thousands of programs across 4,000+ universities, with flexibility to 
                customize your education and explore interdisciplinary studies.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Cultural Diversity</h3>
              <p className="reason-description">
                Experience America's melting pot culture with students from every corner of the world, 
                fostering global perspectives and lifelong connections.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Career Opportunities</h3>
              <p className="reason-description">
                Access to internships and job opportunities with Fortune 500 companies, startups, 
                and leading organizations across all industries.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Entrepreneurship Culture</h3>
              <p className="reason-description">
                Immerse yourself in the world's leading entrepreneurship ecosystem with access to 
                venture capital, incubators, and startup communities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnitedStatesPage;
