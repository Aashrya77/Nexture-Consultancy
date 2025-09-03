import React from 'react';
import './UnitedKingdomPage.css';

const UnitedKingdomPage = () => {
  return (
    <div className="study-uk-container">
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
            <span className="uk-text">United Kingdom</span>
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
            Embrace British Academic Excellence
          </h2>
          <p className="about-description">
            The United Kingdom offers a rich academic heritage with some of the world's oldest and most prestigious universities. 
            Known for shorter degree durations, innovative teaching methods, and strong industry connections, UK education 
            provides excellent value with globally recognized qualifications and access to Europe's diverse opportunities.
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="reasons-section">
        <div className="container">
          <div className="reasons-header">
            <h2 className="reasons-title">
              Reasons for<br />
              studying in <span className="highlight">United Kingdom</span>
            </h2>
          </div>
          
          <div className="reasons-grid">
            <div className="reason-card">
              <h3 className="reason-title">Historic Academic Excellence</h3>
              <p className="reason-description">
                Home to Oxford and Cambridge, plus world-renowned institutions like Imperial College, 
                LSE, and UCL, offering centuries of academic tradition and innovation.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Shorter Degree Duration</h3>
              <p className="reason-description">
                Complete undergraduate degrees in 3 years and master's in 1 year, saving time and money 
                while receiving the same quality education as longer programs elsewhere.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Gateway to Europe</h3>
              <p className="reason-description">
                Strategic location providing easy access to European countries, cultures, and career 
                opportunities, with excellent transport connections across the continent.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Research Leadership</h3>
              <p className="reason-description">
                UK universities lead in research impact globally, with opportunities to work alongside 
                Nobel Prize winners and contribute to groundbreaking discoveries.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Cultural Heritage</h3>
              <p className="reason-description">
                Immerse yourself in rich British culture, from Shakespeare to The Beatles, while 
                experiencing diverse, multicultural cities and historic landmarks.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Graduate Work Visa</h3>
              <p className="reason-description">
                Benefit from the Graduate Route visa allowing 2-3 years of post-study work experience 
                in the UK, enhancing career prospects and international experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnitedKingdomPage;
