"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";
import base_url from "../../../config";
import { services, destinations, courses, stories } from "../../Data/HomeData";

export default function HomePage() {
  const [content, setContent] = useState(null || []);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderStars = (rating) => {
    return Array(rating)
      .fill(0)
      .map((_, index) => (
        <span key={index} className="star">
          ★
        </span>
      ));
  };

  const getContent = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/home");
      if (response.statusText === "OK") {
        setContent(response.data.data);
      } else {
        setContent(getDefaultContent());
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching home content:", error);
      setContent(getDefaultContent());
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
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, [content]);

  const nextImage = () => {
    if (content && content[0].images && content[0].images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % content[0].images.length
      );
    }
  };

  const prevImage = () => {
    if (content && content[0].images && content[0].images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? content[0].images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

const getDefaultContent = () => {
  return {
    hero: {
      title: "Your Next Step to a Bright Future",
      subtitle: "Your Trusted Education Partner",
      description:
        "Expert guidance for study abroad and test preparation. We help students achieve their dreams of international education with personalized coaching and comprehensive support.",
        images: ["/WhatsApp Image 2025-09-03 at 16.20.16.jpeg", "/WhatsApp Image 2025-09-03 at 16.20.12.jpeg", "/WhatsApp Image 2025-09-03 at 16.20.11.jpeg"]
    },
  };
};
  return (
    <div className="homepage">
      {/* Modern Hero Section */}
      <section className="modern-hero-section">
        <div className="modern-hero-container">
          {content ? (
            content.map((content) => {
              const { title, description, images, _id, highlight } = content;

              return (
                <div className="hero-content-wrapper" key={_id}>
                  <div className="hero-left">
                    <div className="hero-badge">
                      Your Trusted Education Partner
                    </div>
                    <h1 className="modern-hero-title">
                      {title}
                      <span className="hero-highlight">{highlight}</span>
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
                              ? `${base_url}/` + images[currentImageIndex]
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
            <div className="hero-content-wrapper">
              <div className="hero-left">
                <div className="hero-badge">Your Trusted Education Partner</div>
                <h1 className="modern-hero-title">
                  Your Next Step to a Bright Future
                  <span className="hero-highlight">Nexture Education</span>
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

              <button className="learn-more-button">
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
            <div key={destination.id} className="destination-card">
              <div className="flag-container">
                <span className="flag-icon">{destination.flag}</span>
              </div>

              <h3 className="destination-title">{destination.country}</h3>

              <p className="destination-universities">
                {destination.universities}
              </p>
            </div>
          ))}
        </div>

        <div className="destinations-footer">
          <button className="view-all-button">
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

        {/* <div className="test-prep-footer">
          <button className="view-all-courses-btn">
            View All Courses
            <span className="arrow-icon">→</span>
          </button>
        </div> */}
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
              <div className="rating-container">
                {renderStars(story.rating)}
              </div>

              <blockquote className="testimonial">
                "{story.testimonial}"
              </blockquote>

              <div className="student-name">{story.studentName}</div>
            </div>
          ))}
        </div>

        <div className="success-stories-footer">
          <button className="read-more-btn">Read More Success Stories</button>
        </div>
      </div>

    </div>
  );
}
