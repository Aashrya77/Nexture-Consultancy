import React, { useEffect, useOptimistic } from 'react';
import { useParams } from 'react-router-dom';
import base_url from '../../../config'; // Adjust the import path as necessary
import './Uni.css'; 
import axios from 'axios' 
import { useState } from 'react';
// Assuming you have a CSS file for styling
const Uni = () => {
  const [universities, setUniversities] = React.useState([]);
    const [currentCountry, setCurrentCountry] = React.useState('');

let {country} = useParams();
  useEffect(() => {
    getUni();
  }, []);
  const getUni = async () => {
    
    try {
      const response = await axios.get(`${base_url}/api/universities/${country}`);
      if (response.data.success) {
        console.log('Universities fetched successfully:', response.data.data);
        console.log('Data:', response);
        setUniversities(response.data.data);
        setCurrentCountry(response.data.data[0].country);
      } else {
        console.error('Failed to fetch universities:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
      
    }
  }
  return (
    <div className="study-australia-container">
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
            <span className="australia-text">{currentCountry}</span>
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
     {universities.map((uni, index) => {
      
      return (
        <>
          <section className="about-section" >
        <div className="container">
          <h2 className="about-title">
            {uni.title}
          </h2>
          <p className="about-description">
            {uni.description}
          </p>
        </div>
      </section>
      <section className="reasons-section">
        <div className="container">
          <div className="reasons-header">
            <h2 className="reasons-title">
              Reasons for<br />
              studying in <span className="highlight">{uni.country}</span>
            </h2>
          </div>
          {uni.features.map((feature, featureIndex) => {
            return (
              <div className="reasons-grid">
            <div className="reason-card" key={featureIndex}>
              <h3 className="reason-title">{feature.title}</h3>
              <p className="reason-description">
                {feature.description}
              </p>
            </div>
          </div>
            )
          }) }
          
        </div>
      </section>
  
        </>
      )
     })}
      

    </div>
  );
};

export default Uni;