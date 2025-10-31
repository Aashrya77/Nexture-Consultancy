import React, { useState } from 'react';
import './GermanyPage.css';
import UniversityCard from '../../UniversityCard/UniversityCard';
import { getUniversitiesByCountry } from '../../../Data/universitiesData';

const GermanyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [sortBy, setSortBy] = useState('ranking');
  
  const universities = getUniversitiesByCountry('Germany');
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
    <div className="study-germany-container">
      {/* Hero Section */}
      <section className="hero-section-germany">
        <div className="hero-content">
          <h1 className="hero-title">
            Study in<br />
            <span className="germany-text">Germany</span>
          </h1>
          <p className="hero-subtitle">
            Experience tuition-free education and engineering excellence in Europe's economic powerhouse
          </p>
        </div>
      </section>

      {/* Country Overview Section */}
      <section className="country-overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2 className="overview-title">
                Engineering Excellence in the Heart of Europe
              </h2>
              <p className="overview-description">
                Germany offers world-class education with many tuition-free universities, making it one of the most 
                affordable destinations for quality higher education. Known for engineering excellence, cutting-edge 
                research, and strong industry connections, Germany provides exceptional opportunities in a thriving 
                European economy with excellent post-graduation prospects.
              </p>
              
              <div className="country-stats">
                <div className="stat-item">
                  <span className="stat-number">{universities.length}+</span>
                  <span className="stat-label">Top Universities</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">€0</span>
                  <span className="stat-label">Tuition Fees</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">18 Months</span>
                  <span className="stat-label">Job Search Visa</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">#1</span>
                  <span className="stat-label">EU Economy</span>
                </div>
              </div>
            </div>
            
            <div className="overview-highlights">
              <h3>Key Benefits</h3>
              <div className="highlight-list">
                <div className="highlight-item">
                  <span className="highlight-icon">💰</span>
                  <div>
                    <h4>Tuition-Free Education</h4>
                    <p>No tuition fees at public universities</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🔧</span>
                  <div>
                    <h4>Engineering Excellence</h4>
                    <p>World-leading technical programs</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🏭</span>
                  <div>
                    <h4>Industry Connections</h4>
                    <p>BMW, Siemens, SAP partnerships</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🇪🇺</span>
                  <div>
                    <h4>EU Opportunities</h4>
                    <p>Work across European Union</p>
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
              Leading Universities in <span className="highlight">Germany</span>
            </h2>
            <p className="universities-subtitle">
              Explore {universities.length} top-ranked universities offering tuition-free world-class education
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
              <h3>🏫 Free Education</h3>
              <p>Public universities charge no tuition fees, even for international students. Only small administrative fees (€150-350 per semester) apply.</p>
            </div>
            <div className="info-card">
              <h3>💼 Work Rights</h3>
              <p>Students can work 120 full days or 240 half days per year. 18-month job search visa after graduation with pathway to permanent residence.</p>
            </div>
            <div className="info-card">
              <h3>📋 Student Visa</h3>
              <p>Student visa process is straightforward with blocked account requirement (€11,208/year). Health insurance mandatory but affordable.</p>
            </div>
            <div className="info-card">
              <h3>🌍 European Access</h3>
              <p>Central location provides easy access to all European countries. Strong industry connections with global companies headquartered in Germany.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GermanyPage;
