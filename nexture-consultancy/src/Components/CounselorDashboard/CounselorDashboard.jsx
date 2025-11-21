import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CounselorDashboard.css';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function CounselorDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const countries = [
    {
      name: 'United States',
      slug: 'united-states',
      region: 'north-america',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      universities: 150,
      averageCost: '$25,000 - $55,000',
      description: 'Home to world-renowned universities and diverse academic programs'
    },
    {
      name: 'Canada',
      slug: 'canada',
      region: 'north-america',
      image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=500&h=400&fit=crop',
      universities: 95,
      averageCost: 'CAD 15,000 - 35,000',
      description: 'High-quality education with multicultural environment and work opportunities'
    },
    {
      name: 'United Kingdom',
      slug: 'united-kingdom',
      region: 'europe',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop',
      universities: 130,
      averageCost: '£15,000 - £35,000',
      description: 'Rich academic tradition with shorter degree durations and global recognition'
    },
    {
      name: 'Australia',
      slug: 'australia',
      region: 'oceania',
      image: 'https://images.unsplash.com/photo-1506973404872-a4a50e48c4d9?w=500&h=400&fit=crop',
      universities: 85,
      averageCost: 'AUD 20,000 - 45,000',
      description: 'High-quality education with excellent research opportunities and work visas'
    },
    {
      name: 'Germany',
      slug: 'germany',
      region: 'europe',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&h=400&fit=crop',
      universities: 75,
      averageCost: '€0 - €20,000',
      description: 'Excellent engineering programs with affordable education and strong economy'
    },
    {
      name: 'New Zealand',
      slug: 'new-zealand',
      region: 'oceania',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=400&fit=crop',
      universities: 45,
      averageCost: 'NZD 22,000 - 35,000',
      description: 'Safe environment with high-quality education and beautiful natural landscapes'
    }
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'oceania', label: 'Oceania' }
  ];

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const handleCountryClick = (slug) => {
    navigate(`/study/${slug}`);
  };

  return (
    <div className="counselor-dashboard">
      {/* Header Section */}
      <section className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">Study Destinations</h1>
          <p className="dashboard-subtitle">
            Explore top countries for international education and find the perfect destination for your studies
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="dashboard-filters">
        <div className="filters-container">
          {/* Search Bar */}
          <div className="search-box">
            <FaSearch className="search-icon-coun" />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Region Filter */}
          <div className="filter-group-coun">
            <FaFilter className="filter-icon-coun" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="region-select"
            >
              {regions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="results-count">
            {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'} found
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="dashboard-countries">
        <div className="countries-container">
          {filteredCountries.length > 0 ? (
            <div className="countries-grid">
              {filteredCountries.map((country) => (
                <div
                  key={country.slug}
                  className="country-card"
                  onClick={() => handleCountryClick(country.slug)}
                >
                  {/* Image Container */}
                  <div className="country-image-wrapper">
                    <img
                      src={country.image}
                      alt={country.name}
                      className="country-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x400?text=' + country.name;
                      }}
                    />
                    <div className="country-overlay">
                      <button className="explore-btn">Explore</button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="country-card-content">
                    <h3 className="country-name">{country.name}</h3>
                    <p className="country-description">{country.description}</p>

                    {/* Stats */}
                    <div className="country-stats">
                      <div className="stat-item">
                        <span className="stat-label">Universities</span>
                        <span className="stat-value">{country.universities}+</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Avg Cost</span>
                        <span className="stat-value">{country.averageCost}</span>
                      </div>
                    </div>

                    {/* Learn More Link */}
                    <div className="card-footer">
                      <span className="learn-more">Learn More →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No countries found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
