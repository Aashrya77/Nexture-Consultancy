import React from 'react';
import './NewZealandPage.css';

const NewZealandPage = () => {
  return (
    <div className="study-nz-container">
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
            <span className="nz-text">New Zealand</span>
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
            Discover Education in Paradise
          </h2>
          <p className="about-description">
            New Zealand offers world-class education in one of the world's most beautiful and safe countries. 
            Known for its innovative teaching methods, strong research programs, and welcoming culture, 
            New Zealand provides an exceptional study experience with stunning natural landscapes, 
            adventure opportunities, and a high quality of life.
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="reasons-section">
        <div className="container">
          <div className="reasons-header">
            <h2 className="reasons-title">
              Reasons for<br />
              studying in <span className="highlight">New Zealand</span>
            </h2>
          </div>
          
          <div className="reasons-grid">
            <div className="reason-card">
              <h3 className="reason-title">Safe & Welcoming Environment</h3>
              <p className="reason-description">
                Consistently ranked as one of the world's safest countries with a welcoming, 
                friendly culture that embraces international students and diverse communities.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">High-Quality Education</h3>
              <p className="reason-description">
                All eight universities rank in the top 500 globally, offering world-class education 
                with innovative teaching methods and strong industry connections.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Natural Beauty & Adventure</h3>
              <p className="reason-description">
                Study surrounded by breathtaking landscapes, from mountains to beaches, with endless 
                opportunities for outdoor adventures and unique wildlife experiences.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Work Rights & Opportunities</h3>
              <p className="reason-description">
                Work up to 20 hours per week during studies and access post-study work visas 
                for up to 3 years, with pathways to permanent residence.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">English-Speaking Country</h3>
              <p className="reason-description">
                Study in English with no language barriers, while experiencing unique Kiwi culture 
                and the indigenous Māori heritage that enriches the educational experience.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Innovation & Research</h3>
              <p className="reason-description">
                Access cutting-edge research opportunities in a country known for innovation, 
                sustainability, and progressive thinking across various fields of study.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewZealandPage;
