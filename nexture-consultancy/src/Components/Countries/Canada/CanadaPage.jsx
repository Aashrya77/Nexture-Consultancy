import React from 'react';
import './CanadaPage.css';

const CanadaPage = () => {
  return (
    <div className="study-canada-container">
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
            <span className="canada-text">Canada</span>
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
            Discover Excellence in Canadian Education
          </h2>
          <p className="about-description">
            Canada offers world-class education in a welcoming, multicultural environment. Known for its high-quality 
            education system, affordable tuition fees, and excellent post-graduation work opportunities, Canada is home 
            to some of the world's top universities and provides a safe, inclusive atmosphere for international students.
          </p>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="reasons-section">
        <div className="container">
          <div className="reasons-header">
            <h2 className="reasons-title">
              Reasons for<br />
              studying in <span className="highlight">Canada</span>
            </h2>
          </div>
          
          <div className="reasons-grid">
            <div className="reason-card">
              <h3 className="reason-title">Affordable World-Class Education</h3>
              <p className="reason-description">
                Canadian universities offer excellent education at more affordable tuition rates compared to other 
                English-speaking countries, with strong government support for international students.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Post-Graduation Work Permit</h3>
              <p className="reason-description">
                Graduate with up to 3 years of work experience through the Post-Graduation Work Permit Program, 
                providing valuable Canadian work experience and pathway to permanent residence.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Multicultural Society</h3>
              <p className="reason-description">
                Experience Canada's welcoming, diverse culture where international students are valued and 
                supported, with strong communities from around the world.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Research Opportunities</h3>
              <p className="reason-description">
                Access cutting-edge research facilities and programs, with Canadian universities leading 
                in fields like AI, clean technology, and healthcare innovation.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Safe Environment</h3>
              <p className="reason-description">
                Study in one of the world's safest countries with excellent healthcare, low crime rates, 
                and strong support systems for international students.
              </p>
            </div>

            <div className="reason-card">
              <h3 className="reason-title">Pathway to Immigration</h3>
              <p className="reason-description">
                Benefit from favorable immigration policies for international graduates, with multiple 
                pathways to permanent residence and Canadian citizenship.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CanadaPage;
