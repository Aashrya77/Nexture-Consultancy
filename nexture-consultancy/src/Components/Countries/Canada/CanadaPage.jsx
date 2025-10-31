import React, { useState } from 'react';
import './CanadaPage.css';
import UniversityCard from '../../UniversityCard/UniversityCard';
import { getUniversitiesByCountry } from '../../../Data/universitiesData';

const CanadaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [sortBy, setSortBy] = useState('ranking');
  
  const universities = getUniversitiesByCountry('Canada');
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
    <div className="study-canada-container">
      {/* Hero Section */}
      <section className="hero-section-canada">
        
        <div className="hero-content">
          <h1 className="hero-title">
            Study in<br />
            <span className="canada-text">Canada</span>
          </h1>
          <p className="hero-subtitle">
            Discover world-class universities and exceptional opportunities in the Great White North
          </p>
        </div>
      </section>

      {/* Country Overview Section */}
      <section className="country-overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2 className="overview-title">
                Discover Excellence in Canadian Education
              </h2>
              <p className="overview-description">
                Canada offers world-class education in a welcoming, multicultural environment. Known for its high-quality 
                education system, affordable tuition fees, and excellent post-graduation work opportunities, Canada is home 
                to some of the world's top universities and provides a safe, inclusive atmosphere for international students.
              </p>
              
              <div className="country-stats">
                <div className="stat-item">
                  <span className="stat-number">{universities.length}+</span>
                  <span className="stat-label">Top Universities</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Years Work Permit</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30%</span>
                  <span className="stat-label">Lower Tuition Costs</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">#1</span>
                  <span className="stat-label">Quality of Life</span>
                </div>
              </div>
            </div>
            
            <div className="overview-highlights">
              <h3>Key Benefits</h3>
              <div className="highlight-list">
                <div className="highlight-item">
                  <span className="highlight-icon">🎓</span>
                  <div>
                    <h4>Affordable Excellence</h4>
                    <p>High-quality education at lower costs</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">💼</span>
                  <div>
                    <h4>Work Opportunities</h4>
                    <p>3-year post-graduation work permit</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🌍</span>
                  <div>
                    <h4>Multicultural Society</h4>
                    <p>Welcoming and diverse communities</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🏠</span>
                  <div>
                    <h4>Immigration Pathway</h4>
                    <p>Clear path to permanent residence</p>
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
              Top Universities in <span className="highlight">Canada</span>
            </h2>
            <p className="universities-subtitle">
              Explore {universities.length} leading Canadian universities offering world-class education and research opportunities
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
              <p>Experience vibrant campus communities with excellent support services, diverse student organizations, and beautiful natural surroundings.</p>
            </div>
            <div className="info-card">
              <h3>💰 Affordable Education</h3>
              <p>Tuition fees 30% lower than US and UK, with numerous scholarship opportunities and part-time work options during studies.</p>
            </div>
            <div className="info-card">
              <h3>📋 Study Permit</h3>
              <p>Streamlined visa process with study permit allowing 20 hours/week work during studies and 3-year post-graduation work permit.</p>
            </div>
            <div className="info-card">
              <h3>🍁 Immigration Path</h3>
              <p>Multiple pathways to permanent residence through Provincial Nominee Programs and Canadian Experience Class.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CanadaPage;
