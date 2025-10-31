import React from 'react';
import './UniversityCard.css';

const UniversityCard = ({ university, onVisitWebsite }) => {
  const handleVisitWebsite = () => {
    if (onVisitWebsite) {
      onVisitWebsite(university);
    } else {
      window.open(university.officialWebsite, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="university-card">
      <div className="university-card-header">
        <div className="university-logo">
          {university.logo ? (
            <img src={university.logo} alt={`${university.name} logo`} />
          ) : (
            <div className="university-logo-placeholder">
              {university.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="university-basic-info">
          <h3 className="university-name">{university.name}</h3>
          <p className="university-location">
            <span className="location-icon">📍</span>
            {university.city}, {university.state}
          </p>
          <div className="university-ranking">
            <span className="ranking-badge">
              #{university.ranking.world} World Ranking
            </span>
            <span className="established-year">Est. {university.establishedYear}</span>
          </div>
        </div>
      </div>

      <div className="university-card-body">
        <p className="university-description">{university.description}</p>
        
        <div className="university-highlights">
          <h4>Key Highlights</h4>
          <ul>
            {university.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="university-programs">
          <h4>Popular Programs</h4>
          <div className="programs-list">
            {university.popularPrograms.slice(0, 4).map((program, index) => (
              <span key={index} className="program-tag">{program}</span>
            ))}
            {university.popularPrograms.length > 4 && (
              <span className="program-tag more">+{university.popularPrograms.length - 4} more</span>
            )}
          </div>
        </div>

        <div className="university-details-grid">
          <div className="detail-item">
            <span className="detail-label">Type:</span>
            <span className="detail-value">{university.type}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Tuition (UG):</span>
            <span className="detail-value">{university.tuitionFees.undergraduate}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Intakes:</span>
            <span className="detail-value">{university.intakes.join(', ')}</span>
          </div>
        </div>

        <div className="university-requirements">
          <h4>Admission Requirements</h4>
          <div className="requirements-tabs">
            <div className="requirement-section">
              <h5>Undergraduate</h5>
              <ul>
                {university.admissionRequirements.undergraduate.slice(0, 2).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="requirement-section">
              <h5>Graduate</h5>
              <ul>
                {university.admissionRequirements.graduate.slice(0, 2).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="university-card-footer">
        <button 
          className="visit-website-btn"
          onClick={handleVisitWebsite}
          aria-label={`Visit ${university.name} official website`}
        >
          <span className="btn-icon">🌐</span>
          Visit Official Website
        </button>
        <div className="university-actions">
          <button className="action-btn favorite-btn" aria-label="Add to favorites">
            <span>❤️</span>
          </button>
          <button className="action-btn share-btn" aria-label="Share university">
            <span>📤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
