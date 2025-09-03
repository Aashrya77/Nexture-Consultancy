import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './StudyAbroadPage.css';

export default function StudyAbroadPage() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();

  const handleCountryClick = (index, routePath) => {
    setSelectedCountry(index);
    navigate(routePath);
  };

  const countries = [
    {
      name: 'United States',
      flag: '🇺🇸',
      universities: 150,
      averageCost: '$25,000 - $55,000',
      duration: '4 years (Bachelor), 2 years (Master)',
      popularCities: ['New York', 'Los Angeles', 'Boston', 'Chicago'],
      topUniversities: ['Harvard', 'MIT', 'Stanford', 'Yale'],
      requirements: ['TOEFL/IELTS', 'SAT/GRE/GMAT', 'SOP', 'LOR'],
      intakeSeasons: ['Fall (Sep)', 'Spring (Jan)', 'Summer (May)'],
      workRights: 'F-1 visa allows part-time work on campus',
      description: 'Home to world-renowned universities and diverse academic programs across all fields.',
      routePath: '/study/united-states'
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      universities: 95,
      averageCost: 'CAD 15,000 - 35,000',
      duration: '4 years (Bachelor), 1-2 years (Master)',
      popularCities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
      topUniversities: ['University of Toronto', 'UBC', 'McGill', 'Waterloo'],
      requirements: ['IELTS/TOEFL', 'SAT/GRE', 'SOP', 'LOR'],
      intakeSeasons: ['Fall (Sep)', 'Winter (Jan)', 'Summer (May)'],
      workRights: 'Study permit allows 20 hours/week work',
      description: 'Known for high-quality education, multicultural environment, and post-graduation work opportunities.',
      routePath: '/study/canada'
    },
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      universities: 130,
      averageCost: '£15,000 - £35,000',
      duration: '3 years (Bachelor), 1 year (Master)',
      popularCities: ['London', 'Manchester', 'Edinburgh', 'Birmingham'],
      topUniversities: ['Oxford', 'Cambridge', 'Imperial College', 'LSE'],
      requirements: ['IELTS/TOEFL', 'A-levels/GRE', 'Personal Statement', 'References'],
      intakeSeasons: ['September', 'January (limited)'],
      workRights: 'Student visa allows 20 hours/week work',
      description: 'Rich academic tradition with shorter degree durations and globally recognized qualifications.',
      routePath: '/study/united-kingdom'
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      universities: 85,
      averageCost: 'AUD 20,000 - 45,000',
      duration: '3-4 years (Bachelor), 1.5-2 years (Master)',
      popularCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
      topUniversities: ['ANU', 'University of Melbourne', 'UNSW', 'University of Sydney'],
      requirements: ['IELTS/TOEFL', 'SAT/GRE', 'SOP', 'LOR'],
      intakeSeasons: ['February', 'July'],
      workRights: 'Student visa allows 48 hours/fortnight work',
      description: 'High-quality education with excellent research opportunities and post-study work visas.',
      routePath: '/study/australia'
    },
    {
      name: 'Germany',
      flag: '🇩🇪',
      universities: 75,
      averageCost: '€0 - €20,000 (Many public universities are tuition-free)',
      duration: '3-4 years (Bachelor), 1-2 years (Master)',
      popularCities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
      topUniversities: ['TU Munich', 'Heidelberg', 'LMU Munich', 'KIT'],
      requirements: ['IELTS/TOEFL/German', 'SAT/GRE', 'SOP', 'LOR'],
      intakeSeasons: ['Winter (Oct)', 'Summer (Apr)'],
      workRights: 'Student visa allows 120 full days or 240 half days work',
      description: 'Excellent engineering and research programs with affordable education and strong economy.',
      routePath: '/study/germany'
    },
    {
      name: 'New Zealand',
      flag: '🇳🇿',
      universities: 45,
      averageCost: 'NZD 22,000 - 35,000',
      duration: '3-4 years (Bachelor), 1-2 years (Master)',
      popularCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'],
      topUniversities: ['University of Auckland', 'University of Otago', 'Victoria University', 'AUT'],
      requirements: ['IELTS/TOEFL', 'SAT/GRE', 'SOP', 'LOR'],
      intakeSeasons: ['February', 'July'],
      workRights: 'Student visa allows 20 hours/week work',
      description: 'Safe, welcoming environment with high-quality education and beautiful natural landscapes.',
      routePath: '/study/new-zealand'
    }
  ];

  return (
    <div className="study-abroad-page">
      {/* Countries Section */}
      <section className="study-countries">
        <div className="study-countries-container">
          <div className="study-countries-header">
            <h2 className="study-countries-title">Popular Study Destinations</h2>
            <p className="study-countries-subtitle">
              Explore top destinations for international education with detailed information about each country
            </p>
          </div>
          <div className="study-countries-grid">
            {countries.map((country, index) => (
              <div 
                key={index} 
                className={`study-country-card ${selectedCountry === index ? 'active' : ''}`}
                onClick={() => handleCountryClick(index, country.routePath)}
              >
                <div className="study-country-header">
                  <span className="study-country-flag">{country.flag}</span>
                  <div className="study-country-info">
                    <h3 className="study-country-name">{country.name}</h3>
                    <p className="study-country-universities">{country.universities}+ Universities</p>
                  </div>
                  <span className="study-country-toggle">
                    {selectedCountry === index ? '−' : '+'}
                  </span>
                </div>
                <p className="study-country-description">{country.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
