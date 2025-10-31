import React, { useState } from 'react';
import './UnitedStatesPage.css';
import UniversityCard from '../../UniversityCard/UniversityCard';
import { getUniversitiesByCountry } from '../../../Data/universitiesData';

const UnitedStatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [sortBy, setSortBy] = useState('ranking');
  
  const universities = getUniversitiesByCountry('United States');
  const cities = ['All Cities', ...new Set(universities.map(uni => uni.city))];
  
  // Filter and sort universities
  const filteredUniversities = universities
    .filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           uni.popularPrograms.some(program => 
                             program.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      const matchesCity = selectedCity === 'All Cities' || uni.city === selectedCity;
      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      if (sortBy === 'ranking') return a.ranking.world - b.ranking.world;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'established') return b.establishedYear - a.establishedYear;
      return 0;
    });

  const handleUniversityVisit = (university) => {
    window.open(university.officialWebsite, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="study-usa-container">
      {/* Hero Section */}
      <section className="hero-section-usa">
        <div className="hero-content">
          <h1 className="hero-title">
            Study in<br />
            <span className="usa-text">United States</span>
          </h1>
          <p className="hero-subtitle">
            Discover world-renowned universities and limitless opportunities in America
          </p>
        </div>
      </section>

      {/* Country Overview Section */}
      <section className="country-overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2 className="overview-title">
                Experience American Excellence in Education
              </h2>
              <p className="overview-description">
                The United States hosts the world's most prestigious universities and offers unparalleled academic diversity. 
                With cutting-edge research facilities, innovative teaching methods, and a culture of entrepreneurship, 
                American higher education provides students with opportunities to learn from world-renowned faculty and 
                engage with the latest advancements in every field of study.
              </p>
              
              <div className="country-stats">
                <div className="stat-item">
                  <span className="stat-number">{universities.length}+</span>
                  <span className="stat-label">Elite Universities</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">8/10</span>
                  <span className="stat-label">World's Top 10</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4000+</span>
                  <span className="stat-label">Total Universities</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1M+</span>
                  <span className="stat-label">International Students</span>
                </div>
              </div>
            </div>
            
            <div className="overview-highlights">
              <h3>Key Benefits</h3>
              <div className="highlight-list">
                <div className="highlight-item">
                  <span className="highlight-icon">🏆</span>
                  <div>
                    <h4>World's Best Universities</h4>
                    <p>8 of top 10 global universities</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🔬</span>
                  <div>
                    <h4>Research Excellence</h4>
                    <p>Leading innovation and Nobel laureates</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💼</span>
                  <div>
                    <h4>Career Opportunities</h4>
                    <p>Access to Fortune 500 companies</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🚀</span>
                  <div>
                    <h4>Entrepreneurship Hub</h4>
                    <p>Silicon Valley and startup ecosystem</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="universities-section">
        <div className="container">
          <div className="universities-header">
            <h2 className="universities-title">
              Elite Universities in <span className="highlight">United States</span>
            </h2>
            <p className="universities-subtitle">
              Explore {universities.length} world-renowned universities offering unparalleled education and research opportunities
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="universities-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search universities or programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="filter-controls">
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="filter-select"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="ranking">Sort by Ranking</option>
                <option value="name">Sort by Name</option>
                <option value="established">Sort by Established</option>
              </select>
            </div>
          </div>

          {/* Universities Grid */}
          <div className="universities-grid">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map(university => (
                <UniversityCard
                  key={university.id}
                  university={university}
                  onVisitWebsite={handleUniversityVisit}
                />
              ))
            ) : (
              <div className="no-results">
                <h3>No universities found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="additional-info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>🏠 Campus Life</h3>
              <p>Experience vibrant campus communities with world-class facilities, diverse student organizations, and rich traditions at America's top universities.</p>
            </div>
            <div className="info-card">
              <h3>💰 Financial Aid</h3>
              <p>Access generous financial aid packages, scholarships, and work-study programs. Many top universities offer need-based aid covering full tuition.</p>
            </div>
            <div className="info-card">
              <h3>📋 Student Visa</h3>
              <p>F-1 student visa allows study and limited on-campus work, with Optional Practical Training (OPT) for 1-3 years post-graduation work experience.</p>
            </div>
            <div className="info-card">
              <h3>🎆 Innovation Hub</h3>
              <p>Access to Silicon Valley, Wall Street, and major research centers with unparalleled networking and career opportunities in every field.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnitedStatesPage;
