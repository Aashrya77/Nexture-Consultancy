import React, { useState } from 'react';
import './NewZealandPage.css';
import UniversityCard from '../../UniversityCard/UniversityCard';
import { getUniversitiesByCountry } from '../../../Data/universitiesData';

const NewZealandPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [sortBy, setSortBy] = useState('ranking');
  
  const universities = getUniversitiesByCountry('New Zealand');
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
    <div className="study-nz-container">
      {/* Hero Section */}
      <section className="hero-section-new">
        <div className="hero-content">
          <h1 className="hero-title">
            Study in<br />
            <span className="nz-text">New Zealand</span>
          </h1>
          <p className="hero-subtitle">
            Experience world-class education in paradise with stunning natural beauty
          </p>
        </div>
      </section>

      {/* Country Overview Section */}
      <section className="country-overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2 className="overview-title">
                Discover Education in Paradise
              </h2>
              <p className="overview-description">
                New Zealand offers world-class education in one of the world's most beautiful and safe countries. 
                Known for its innovative teaching methods, strong research programs, and welcoming culture, 
                New Zealand provides an exceptional study experience with stunning natural landscapes, 
                adventure opportunities, and a high quality of life.
              </p>
              
              <div className="country-stats">
                <div className="stat-item">
                  <span className="stat-number">{universities.length}</span>
                  <span className="stat-label">Universities</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">#2</span>
                  <span className="stat-label">Safest Country</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3 Years</span>
                  <span className="stat-label">Post-Study Work</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">Top 500</span>
                  <span className="stat-label">All Unis Ranked</span>
                </div>
              </div>
            </div>
            
            <div className="overview-highlights">
              <h3>Key Benefits</h3>
              <div className="highlight-list">
                <div className="highlight-item">
                  <span className="highlight-icon">🔒</span>
                  <div>
                    <h4>Safe Environment</h4>
                    <p>World's 2nd safest country</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🏞️</span>
                  <div>
                    <h4>Natural Beauty</h4>
                    <p>Stunning landscapes & adventure</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🎓</span>
                  <div>
                    <h4>Quality Education</h4>
                    <p>All 8 universities globally ranked</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💼</span>
                  <div>
                    <h4>Work Opportunities</h4>
                    <p>3-year post-study work visa</p>
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
              Top Universities in <span className="highlight">New Zealand</span>
            </h2>
            <p className="universities-subtitle">
              Explore {universities.length} world-ranked universities in one of the world's safest countries
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
              <h3>🏞️ Adventure Paradise</h3>
              <p>Study surrounded by breathtaking landscapes from mountains to beaches. Experience unique wildlife and endless outdoor adventure opportunities.</p>
            </div>
            <div className="info-card">
              <h3>💰 Affordable Living</h3>
              <p>Lower cost of living compared to other English-speaking countries. Scholarships available including New Zealand Excellence Awards.</p>
            </div>
            <div className="info-card">
              <h3>📋 Student Visa</h3>
              <p>Student visa allows 20 hours work per week during studies. Post-study work visa up to 3 years with pathway to permanent residence.</p>
            </div>
            <div className="info-card">
              <h3>🌏 Kiwi Culture</h3>
              <p>Experience friendly Kiwi culture and rich Māori heritage. English-speaking environment with no language barriers for international students.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewZealandPage;
