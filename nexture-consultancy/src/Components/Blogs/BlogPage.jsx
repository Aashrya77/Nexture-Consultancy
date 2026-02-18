import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import "./BlogPage.css";
import axios from 'axios';
import base_url from '../../../config';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [imageErrors, setImageErrors] = useState({});
  const blogsPerPage = 6;

  const getAssetUrl = (assetPath) => {
    if (!assetPath || typeof assetPath !== 'string') return '';
    if (/^https?:\/\//i.test(assetPath)) return assetPath;
    const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
    return `${base_url}${normalized}`;
  };


  const getBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${base_url}/api/blogs`);
      console.log(response)
      if (!response || !response.data) {
        throw new Error('No data received from server');
      }
      
      let blogsData = response.data;
      
      // Handle different response formats
      if (blogsData.data && Array.isArray(blogsData.data)) {
        // Handle { data: [...] } format
        setBlogs(blogsData.data);
        setError(null);
      } else if (Array.isArray(blogsData)) {
        // Handle direct array format (fallback)
        setBlogs(blogsData);
        setError(null);
      } else if (blogsData.blogs && Array.isArray(blogsData.blogs)) {
        // Handle { blogs: [...] } format (fallback)
        setBlogs(blogsData.blogs);
        setError(null);
      } else {
        // Unexpected format
        console.warn('API response format unexpected:', blogsData);
        setBlogs([]);
        setError("Unexpected data format received from server.");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      
      // Provide more specific error messages
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 404) {
          setError("Blog service not found. Please contact support.");
        } else if (error.response.status === 500) {
          setError("Server error occurred. Please try again later.");
        } else {
          setError(`Error: ${error.response.status}. Unable to load blogs.`);
        }
      } else if (error.request) {
        // Request made but no response
        setError("Cannot connect to server. Please check your internet connection.");
      } else {
        // Something else happened
        setError(error.message || "Failed to load blog posts. Please try again later.");
      }
      
      setBlogs([]); // Always ensure blogs is an array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  // Handle image loading errors
  const handleImageError = (blogId) => {
    setImageErrors(prev => ({ ...prev, [blogId]: true }));
  };

  // Filter blogs based on search term and selected tag
  const filteredBlogs = Array.isArray(blogs) ? blogs.filter(blog => {
    try {
      const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           blog.content?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? blog.tags?.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    } catch (err) {
      console.error('Error filtering blog:', blog, err);
      return false;
    }
  }) : [];

  // Get all unique tags from blogs
  const allTags = Array.isArray(blogs) 
    ? [...new Set(blogs.flatMap(blog => blog.tags || []))].filter(Boolean)
    : [];

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Adjust page if current page is out of bounds after filtering
  useEffect(() => {
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredBlogs.length, currentPage]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'Date unavailable';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (err) {
      return 'Date unavailable';
    }
  };

  // Truncate text function
  const truncateText = (text, maxLength) => {
    if (!text) return 'No description available';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setCurrentPage(1);
  };

  return (
    <>
      <div className="blog-posts-container">
        <div className="blog-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
              disabled={loading || (blogs.length === 0 && !error)}
            />
          </div>
          
          <div className="filter-container">
            <select 
              value={selectedTag} 
              onChange={(e) => {
                setSelectedTag(e.target.value);
                setCurrentPage(1);
              }}
              className="tag-filter"
              disabled={loading || (blogs.length === 0 && !error)}
            >
              <option value="">All Tags</option>
              {allTags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        <h1 className="section-title">Latest Articles</h1>
        <p className="section-subtitle">Insights and tips for your international education journey</p>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading blog posts...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">⚠️ {error}</p>
            <button onClick={getBlogs} className="retry-button">
              🔄 Try Again
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="no-results">
            <div className="empty-state">
              <span className="empty-icon">📝</span>
              <h3>No Blog Posts Yet</h3>
              <p>We haven't published any blog posts yet. Check back soon for exciting content!</p>
            </div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="no-results">
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <h3>No Results Found</h3>
              <p>No blog posts match your search criteria.</p>
              {(searchTerm || selectedTag) && (
                <button 
                  onClick={clearFilters} 
                  className="clear-filters-button"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="blog-posts-grid">
              {currentBlogs.map((post) => {
                const { _id, title, content, images, tags, createdAt } = post;
                return (
                  <article key={_id} className="blog-post-card">
                    <div className="blog-post-image">
                      {images && images[0] && !imageErrors[_id] ? (
                        <img 
                          src={getAssetUrl(images[0])} 
                          alt={title || 'Blog post image'}
                          onError={() => handleImageError(_id)}
                        />
                      ) : (
                        <div className="image-placeholder">
                          <span className="placeholder-icon">🖼️</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="blog-post-content">
                      <div className="blog-post-meta">
                        <span className="author">
                          <span className="author-icon">👤</span>
                          Nexture Education
                        </span>
                        <span className="date">
                          <span className="date-icon">📅</span>
                          {formatDate(createdAt)}
                        </span>
                      </div>
                      
                      <h3 className="blog-post-title">{title || 'Untitled Post'}</h3>
                      
                      <div className="blog-post-excerpt" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncateText(content, 150)) }} />
                      
                      <div className="blog-post-footer">
                        
                        <Link to={`/blog/${_id}`} className="read-more-link">
                          Read More
                          <span className="arrow-icon">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            
            {/* Pagination */}
            {filteredBlogs.length > blogsPerPage && (
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-button nav-button"
                >
                  ← Previous
                </button>
                
                {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredBlogs.length / blogsPerPage)}
                  className="page-button nav-button"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BlogPage;