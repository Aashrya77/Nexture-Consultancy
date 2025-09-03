import React from 'react';
import './GermanyPage.css';

const GermanyPage = () => {
  return (
    <div className="study-germany-container">
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
            <span className="germany-text">Germany</span>
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
            Engineering Excellence in the Heart of Europe
          </h2>
          <p className="about-description">
            Germany offers world-class education with many tuition-free universities, making it one of the most 
            affordable destinations for quality higher education. Known for engineering excellence, cutting-edge 
            research, and strong industry connections, Germany provides exceptional opportunities in a thriving 
            European economy with excellent post-graduation prospects.
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="reasons-section">
        <div className="container">
          <div className="reasons-header">
            <h2 className="reasons-title">
              Reasons for<br />
              studying in <span className="highlight">Germany</span>
            </h2>
          </div>
          
          <div className="reasons-grid">
            <div className="reason-card">
              <h3 className="reason-title">Tuition-Free Education</h3>
              <p className="reason-description">
                Many public universities offer tuition-free education even for international students, 
                making world-class German education highly affordable with minimal fees.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Engineering & Technology Hub</h3>
              <p className="reason-description">
                Home to leading engineering programs and research institutions, with strong connections 
                to major companies like BMW, Siemens, SAP, and Volkswagen.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Strong Economy</h3>
              <p className="reason-description">
                Europe's largest economy offers excellent job prospects, with high demand for skilled 
                professionals and competitive salaries across various industries.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Research Excellence</h3>
              <p className="reason-description">
                Access to world-renowned research institutions and funding opportunities, with Germany 
                leading in innovation across science, technology, and engineering fields.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Central European Location</h3>
              <p className="reason-description">
                Strategic location in the heart of Europe provides easy access to travel and explore 
                neighboring countries, cultures, and career opportunities across the EU.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Work Opportunities</h3>
              <p className="reason-description">
                18-month job search visa after graduation, with pathways to permanent residence 
                and EU citizenship, plus opportunities to work part-time during studies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GermanyPage;
