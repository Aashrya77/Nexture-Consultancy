"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";
import base_url from "../../../config";
import { services, destinations, courses, stories } from "../../Data/HomeData";

// Loading Skeleton Component
const HeroSkeleton = () => (
  <div className="hero-content-wrapper">
    <div className="hero-left">
      <div className="skeleton skeleton-badge" style={{ width: '200px', height: '24px', marginBottom: '20px' }}></div>
      <div className="skeleton skeleton-title" style={{ width: '80%', height: '60px', marginBottom: '15px' }}></div>
      <div className="skeleton skeleton-title" style={{ width: '60%', height: '60px', marginBottom: '20px' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '90%', height: '20px', marginBottom: '10px' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '80%', height: '20px', marginBottom: '30px' }}></div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <div className="skeleton skeleton-button" style={{ width: '200px', height: '50px' }}></div>
        <div className="skeleton skeleton-button" style={{ width: '200px', height: '50px' }}></div>
      </div>
    </div>
    <div className="hero-right">
      <div className="skeleton skeleton-image" style={{ width: '100%', height: '400px', borderRadius: '12px' }}></div>
    </div>
  </div>
);

export default function HomePage() {
  // FIX 1: Initialize content as empty array (not null || [])
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const renderStars = (rating) => {
    return Array(rating)
      .fill(0)
      .map((_, index) => (
        <span key={index} className="star">
          ★
        </span>
      ));
  };

  // FIX 2: Return an array, not an object
  const getDefaultContent = () => {
    return [
      {
        _id: "default",
        title: "Your Next Step to a Bright Future",
        highlight: " with Nexture Education",
        description:
          "Expert guidance for study abroad and test preparation. We help students achieve their dreams of international education with personalized coaching and comprehensive support.",
        images: [
          "/WhatsApp Image 2025-09-03 at 16.20.16.jpeg",
          "/WhatsApp Image 2025-09-03 at 16.20.12.jpeg",
          "/WhatsApp Image 2025-09-03 at 16.20.11.jpeg"
        ]
      }
    ];
  };

  const getContent = async () => {
    try {
      const response = await axios.get(`${base_url}/api/home`);
      if (response.statusText === "OK" && response.data.data) {
        // FIX 3: Ensure data is always an array
        const contentData = Array.isArray(response.data.data) 
          ? response.data.data 
          : [response.data.data];
        setContent(contentData);
      } else {
        setContent(getDefaultContent());
      }
    } catch (error) {
      console.error("Error fetching home content:", error);
      setContent(getDefaultContent());
    } finally {
      // FIX 4: Always set loading to false in finally block
      setLoading(false);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  // Slideshow functionality
  useEffect(() => {
    if (content && content.length > 0 && content[0].images && content[0].images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % content[0].images.length
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [content]);

  const nextImage = () => {
    // FIX 5: Add optional chaining
    if (content && content[0]?.images && content[0].images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % content[0].images.length
      );
    }
  };

  const prevImage = () => {
    // FIX 6: Add optional chaining
    if (content && content[0]?.images && content[0].images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? content[0].images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleViewAllDestinations = () => {
    navigate('/study-abroad');
  };

  const handleReadMoreStories = () => {
    navigate('/about');
  };

  const handleServiceClick = (serviceTitle) => {
    if (serviceTitle === 'Study Abroad Consulting') {
      navigate('/study-abroad');
    } else if (serviceTitle === 'Test Preparation') {
      navigate('/test-prep/ielts');
    } else if (serviceTitle === 'Career Counseling') {
      navigate('/consultation');
    }
  };

  return (
    <div className="homepage">
      {/* Modern Hero Section */}
      <section className="modern-hero-section">
        <div className="modern-hero-container">
          {/* FIX 7: Add loading skeleton */}
          {loading ? (
            <HeroSkeleton />
          ) : content && content.length > 0 ? (
            content.map((item) => {
              const { title, description, images, _id, highlight } = item;

              return (
                <div className="hero-content-wrapper" key={_id}>
                  <div className="hero-left">
                    {/* <div className="hero-badge">
                      Your Trusted Education Partner
                    </div> */}
                    <h1 className="modern-hero-title">
                      {title}
                      {/* FIX 8: Add conditional rendering for highlight */}
                      {highlight && <span className="hero-highlight">{highlight}</span>}
                    </h1>
                    <p className="modern-hero-subtitle">{description}</p>
                    <div className="hero-cta-wrapper">
                      <Link to="/consultation" className="btn-modern-primary">
                        Get Free Consultation
                        <span className="btn-arrow">→</span>
                      </Link>
                      <Link to="/study-abroad" className="btn-modern-secondary">
                        Explore Destinations
                        <span className="btn-arrow">→</span>
                      </Link>
                    </div>
                  </div>
                  <div className="hero-right">
                    <div className="hero-slideshow">
                      <div className="slideshow-container">
                        <img
                          src={
                            images && images.length > 0
                              ? `${base_url}${images[currentImageIndex]}`
                              : "https://via.placeholder.com/600x400"
                          }
                          alt={`Hero ${currentImageIndex + 1}`}
                          className="hero-image"
                        />
                        
                        {images && images.length > 1 && (
                          <>
                            <button className="slideshow-btn prev-btn" onClick={prevImage}>
                              &#10094;
                            </button>
                            <button className="slideshow-btn next-btn" onClick={nextImage}>
                              &#10095;
                            </button>
                            
                            <div className="slideshow-dots">
                              {images.map((_, index) => (
                                <span
                                  key={index}
                                  className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                  onClick={() => goToImage(index)}
                                ></span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Fallback content
            <div className="hero-content-wrapper">
              <div className="hero-left">
                <div className="hero-badge">Your Trusted Education Partner</div>
                <h1 className="modern-hero-title">
                  Your Next Step to a Bright Future
                  <span className="hero-highlight"> with Nexture Education</span>
                </h1>
                <p className="modern-hero-subtitle">
                  Expert guidance for study abroad and test preparation. We help
                  students achieve their dreams of international education with
                  personalized coaching and comprehensive support.
                </p>
                <div className="hero-cta-wrapper">
                  <Link to="/consultation" className="btn-modern-primary">
                    Get Free Consultation
                    <span className="btn-arrow">→</span>
                  </Link>
                  <Link to="/study-abroad" className="btn-modern-secondary">
                    Explore Destinations
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>
              <div className="hero-right">
                <img
                  src="https://via.placeholder.com/600x400"
                  alt="Hero"
                  className="hero-image"
                />
              </div>
            </div>
          )} 
        </div>
      </section>

      {/* Features Section */}
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">
            Comprehensive education services to help you achieve your
            international study goals
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-content">
                <div className={`icon-container ${service.iconClass}`}>
                  {service.icon}
                </div>

                <h3 className="service-title">{service.title}</h3>

                <p className="service-description">{service.description}</p>
              </div>

              <button 
                className="learn-more-button"
                onClick={() => handleServiceClick(service.title)}
              >
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Study Destinations */}
      <div className="destinations-container">
        <div className="destinations-header">
          <h2 className="destinations-title">Popular Study Destinations</h2>
          <p className="destinations-subtitle">
            Explore top countries for international education
          </p>
        </div>

        <div className="destinations-grid">
          {destinations.map((destination) => (
            <div 
              key={destination.id} 
              className="destination-card"
              onClick={() => navigate(destination.routePath)}
            >
              <div className="destination-card-content">
                <span className="flag-icon">{destination.flag}</span>
                <h3 className="destination-title">{destination.country}</h3>
                <p className="destination-universities">
                  {destination.universities}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="destinations-footer">
          <button 
            className="view-all-button"
            onClick={handleViewAllDestinations}
          >
            View All Destinations
            <span className="arrow-icon">→</span>
          </button>
        </div>
      </div>

      {/* Test Prep Courses */}
      <div className="test-prep-container">
        <div className="test-prep-header">
          <h2 className="test-prep-title">Test Preparation Courses</h2>
          <p className="test-prep-subtitle">
            Expert coaching for all major standardized tests
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              {course.discount && (
                <div className="course-discount-badge">{course.discount}</div>
              )}
              <div className="course-header">
                <div className="course-test-name">{course.testName}</div>
                <div className="course-category">{course.category}</div>
              </div>

              <div className="course-details">
                <div className="course-detail">
                  <span className="check-icon">✓</span>
                  <span className="detail-text">
                    Duration: {course.duration}
                  </span>
                </div>

                <div className="course-detail">
                  <span className="check-icon">✓</span>
                  <span className="detail-text">
                    Starting from {course.price}
                  </span>
                </div>
              </div>

              <Link 
                to={course.testName === 'IELTS' ? '/test-prep/ielts' : '/test-prep/pte'} 
                className="learn-more-btn"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="success-stories-container">
        <div className="success-stories-header">
          <h2 className="success-stories-title">Student Success Stories</h2>
          <p className="success-stories-subtitle">
            Hear from our successful students
          </p>
        </div>

        <div className="stories-grid">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <div className="story-image-wrapper">
                <img 
                  src={story.image} 
                  alt={story.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=' + story.name;
                  }}
                />
              </div>

              <div className="story-card-content">
                <div className="rating-container">
                  {renderStars(story.rating)}
                </div>

                <h4 className="story-title">{story.title}</h4>

                <blockquote className="testimonial">
                  "{story.testimonial}"
                </blockquote>

                <p className="student-name">– {story.name}</p>
                <p className="student-program">{story.program}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="success-stories-footer">
          <button 
            className="read-more-btn"
            onClick={handleReadMoreStories}
          >
            Read More Success Stories
          </button>
        </div>
      </div>

    </div>
  );
}