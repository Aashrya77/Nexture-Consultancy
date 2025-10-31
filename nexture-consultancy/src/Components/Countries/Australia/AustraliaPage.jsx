import React, { useState } from 'react';
import './AustraliaPage.css';
import UniversityCard from '../../UniversityCard/UniversityCard';
import { getUniversitiesByCountry } from '../../../Data/universitiesData';

const AustraliaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [sortBy, setSortBy] = useState('ranking');
  
  const universities = getUniversitiesByCountry('Australia');
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
    // Track university visits if needed
    window.open(university.officialWebsite, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="study-australia-container">
      {/* Hero Section */}
      <section className="hero-section-aus">
        
        <div className="hero-content">
          <h1 className="hero-title-aus">
            Study in<br />
            <span className="australia-text">Australia</span>
          </h1>
          <p className="hero-subtitle-aus">
            Discover world-class universities and exceptional education opportunities
          </p>
        </div>
      </section>

      {/* Country Overview Section */}
      <section className="country-overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2 className="overview-title">
                Why Choose Australia for Your Studies?
              </h2>
              <p className="overview-description">
                Australia offers world-class education with a unique blend of academic excellence, cultural diversity, and stunning natural beauty. 
                With over 40 universities in the global top 500, Australia provides exceptional opportunities for international students to pursue 
                their academic goals while experiencing a vibrant, multicultural society.
              </p>
              
              <div className="country-stats">
                <div className="stat-item">
                  <span className="stat-number">{universities.length}+</span>
                  <span className="stat-label">Top Universities</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">7</span>
                  <span className="stat-label">Top 100 Global</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2-4</span>
                  <span className="stat-label">Years Work Visa</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">140+</span>
                  <span className="stat-label">Nationalities</span>
                </div>
              </div>
            </div>
            
            <div className="overview-highlights">
              <h3>Key Benefits</h3>
              <div className="highlight-list">
                <div className="highlight-item">
                  <span className="highlight-icon">🎓</span>
                  <div>
                    <h4>World-Class Education</h4>
                    <p>7 universities in global top 100</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💼</span>
                  <div>
                    <h4>Post-Study Work Rights</h4>
                    <p>2-4 years work visa after graduation</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🌏</span>
                  <div>
                    <h4>Multicultural Environment</h4>
                    <p>Students from 140+ countries</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🔬</span>
                  <div>
                    <h4>Research Excellence</h4>
                    <p>3rd globally for research impact</p>
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
              Top Universities in <span className="highlight">Australia</span>
            </h2>
            <p className="universities-subtitle">
              Explore {universities.length} leading universities offering world-class education and research opportunities
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
              <h3>🏠 Student Life</h3>
              <p>Experience vibrant campus life with excellent accommodation options, student clubs, and cultural activities in Australia's most liveable cities.</p>
            </div>
            <div className="info-card">
              <h3>💰 Cost of Living</h3>
              <p>Average living costs range from AUD 20,000-27,000 per year, with various scholarship opportunities available for international students.</p>
            </div>
            <div className="info-card">
              <h3>📋 Visa Requirements</h3>
              <p>Student visa (subclass 500) allows study and limited work rights. Post-study work visas available for 2-4 years after graduation.</p>
            </div>
            <div className="info-card">
              <h3>🌟 Career Prospects</h3>
              <p>High graduate employment rates with strong industry connections and internship opportunities across all major sectors.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AustraliaPage;
