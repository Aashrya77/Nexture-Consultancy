import React from 'react';
import './AustraliaPage.css';

const AustraliaPage = () => {
  return (
    <div className="study-australia-container">
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
            <span className="australia-text">Australia</span>
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
            Why Choose Australia for Your Studies?
          </h2>
          <p className="about-description">
            Australia offers world-class education with a unique blend of academic excellence, cultural diversity, and stunning natural beauty. 
            With over 40 universities in the global top 500, Australia provides exceptional opportunities for international students to pursue 
            their academic goals while experiencing a vibrant, multicultural society.
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="reasons-section">
        <div className="container">
          <div className="reasons-header">
            <h2 className="reasons-title">
              Reasons for<br />
              studying in <span className="highlight">Australia</span>
            </h2>
          </div>
          
          <div className="reasons-grid">
            <div className="reason-card">
              <h3 className="reason-title">World-Class Education System</h3>
              <p className="reason-description">
                Australia has 7 universities in the world's top 100, offering internationally recognized qualifications 
                and cutting-edge research opportunities across all fields of study.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Post-Study Work Opportunities</h3>
              <p className="reason-description">
                Graduate visa allows you to work in Australia for 2-4 years after completing your studies, 
                providing valuable international work experience.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Multicultural Environment</h3>
              <p className="reason-description">
                Experience a welcoming, diverse society with students from over 140 countries, 
                creating a rich cultural learning environment.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Research Excellence</h3>
              <p className="reason-description">
                Australia ranks 3rd globally for research impact, offering exceptional opportunities 
                for students to engage in groundbreaking research projects.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Quality of Life</h3>
              <p className="reason-description">
                Enjoy a high standard of living with excellent healthcare, safety, and work-life balance 
                in some of the world's most liveable cities.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Innovation Hub</h3>
              <p className="reason-description">
                Be part of a thriving innovation ecosystem with strong industry connections, 
                internship opportunities, and entrepreneurship support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AustraliaPage;
