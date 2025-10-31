import React, { useState } from 'react';
import './UnitedKingdomPage.css';
import UniversityCard from '../../UniversityCard/UniversityCard';
import { getUniversitiesByCountry } from '../../../Data/universitiesData';

const UnitedKingdomPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [sortBy, setSortBy] = useState('ranking');
  
  const universities = getUniversitiesByCountry('United Kingdom');
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
    <div className="study-uk-container">
      {/* Hero Section */}
      <section className="hero-section-uk">
        <div className="hero-content">
          <h1 className="hero-title">
            Study in<br />
            <span className="uk-text">United Kingdom</span>
          </h1>
          <p className="hero-subtitle">
            Discover centuries of academic excellence and innovation in the UK
          </p>
        </div>
      </section>

      {/* Country Overview Section */}
      <section className="country-overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2 className="overview-title">
                Embrace British Academic Excellence
              </h2>
              <p className="overview-description">
                The United Kingdom offers a rich academic heritage with some of the world's oldest and most prestigious universities. 
                Known for shorter degree durations, innovative teaching methods, and strong industry connections, UK education 
                provides excellent value with globally recognized qualifications and access to Europe's diverse opportunities.
              </p>
              
              <div className="country-stats">
                <div className="stat-item">
                  <span className="stat-number">{universities.length}+</span>
                  <span className="stat-label">Top Universities</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3 Years</span>
                  <span className="stat-label">Bachelor's Duration</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">1 Year</span>
                  <span className="stat-label">Master's Duration</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2-3 Years</span>
                  <span className="stat-label">Post-Study Work</span>
                </div>
              </div>
            </div>
            
            <div className="overview-highlights">
              <h3>Key Benefits</h3>
              <div className="highlight-list">
                <div className="highlight-item">
                  <span className="highlight-icon">🏛️</span>
                  <div>
                    <h4>Historic Excellence</h4>
                    <p>Oxford, Cambridge & world-class institutions</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">⏱️</span>
                  <div>
                    <h4>Shorter Duration</h4>
                    <p>3-year bachelor's, 1-year master's</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🌍</span>
                  <div>
                    <h4>Gateway to Europe</h4>
                    <p>Easy access to European opportunities</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💼</span>
                  <div>
                    <h4>Graduate Work Visa</h4>
                    <p>2-3 years post-study work rights</p>
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
              Prestigious Universities in <span className="highlight">United Kingdom</span>
            </h2>
            <p className="universities-subtitle">
              Explore {universities.length} world-renowned universities with centuries of academic excellence
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
              <h3>🏰 Rich Heritage</h3>
              <p>Study at institutions with centuries of history, from medieval Oxford and Cambridge to modern research powerhouses like Imperial College.</p>
            </div>
            <div className="info-card">
              <h3>💰 Cost Effective</h3>
              <p>Shorter degree durations mean lower overall costs. Many scholarships available including Chevening and Commonwealth scholarships.</p>
            </div>
            <div className="info-card">
              <h3>📋 Student Visa</h3>
              <p>Student visa allows part-time work during studies, with Graduate Route visa providing 2-3 years post-study work opportunity.</p>
            </div>
            <div className="info-card">
              <h3>🌍 Cultural Experience</h3>
              <p>Experience British culture, explore Europe easily, and benefit from the UK's multicultural cities and global connections.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnitedKingdomPage;
